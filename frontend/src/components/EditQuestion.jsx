import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Dropdown, Checkbox, Input } from 'semantic-ui-react'
import config from '../config';
import { useParams, useLocation } from 'react-router-dom';

// PROBABLY MOVE THIS TO ANOTHER FILE
function AnswerInput({ answeridx, answersState, setAnswersState }) {
  const handleInput = (e) => {
    let newAnswers = [... answersState];
    newAnswers[answeridx].title = e.target.value;
    setAnswersState(newAnswers);
  }

  const handleCheckbox = () => {
    let newAnswers = [... answersState];
    newAnswers[answeridx].correct = !newAnswers[answeridx].correct;
    setAnswersState(newAnswers);
  }

  return (
    <Form.Field>
      <label>Answer {answeridx + 1}</label>
      <Input value={answersState[answeridx].title} onChange={handleInput}/>
      <Checkbox label="Correct Answer" 
                defaultChecked={answersState[answeridx].correct} 
                onChange={handleCheckbox}/>
    </Form.Field>
  )
}

function EditQuestion() {
  const location = useLocation();
  const { questions, quizName, thumbnail, questionJSON } = location.state;
  const { id, questionId } = useParams();

  const [questionType, setQuestionType] = useState(questionJSON.type);
  const [questionName, setQuestionName] = useState(questionJSON.name);
  const [duration, setDuration] = useState(questionJSON.duration);
  const [points, setPoints] = useState(questionJSON.points);
  const [attach, setAttach] = useState(questionJSON.videolink);
  const [answers, setAnswers] = useState(questionJSON.answers);

  const questionTypes = [
    {
      text: 'Multiple Choice',
      value: 'Multiple Choice',
    },
    {
      text: 'Single Choice',
      value: 'Single Choice',
    },
  ]

  const durationList = [
    {
      text: '5',
      value: 5,
    },
    {
      text: '10',
      value: 10,
    },
    {
      text: '20',
      value: 20,
    },
    {
      text: '30',
      value: 30,
    },
  ]

  const pointsList = [
    {
      text: '0',
      value: 0,
    },
    {
      text: '1000',
      value: 1000,
    },
    {
      text: '2000',
      value: 2000,
    },
  ]

  // Returns new list with question edited
  const getNewQuestions = () => {
    let newQuestions = [...questions];
    for (let json of newQuestions) {
      if (json.questionId === parseInt(questionId)) {
        json.type = questionType;
        json.name = questionName;
        json.duration = duration;
        json.points = points;
        json.videolink = attach;
        json.answers = answers;
      }
    }
    return newQuestions;
  }

  // Error handling for question editing
  const editError = () => {
    // Empty field error handling?

    // Single/Multiple Choice
    let correct = 0;
    for (const answer of answers) {
      if (answer.correct === true) {
        correct++;
      }
    }
    if (questionType === 'Single Choice' && correct !== 1) {
      console.log('Please select only 1 answer or select multiple choice');
      return true;
    }
    if (questionType === 'Multiple Choice' && correct < 2) {
      console.log('Please select more than 1 answer or select single choice');
      return true;
    }
    return false;
  }

  const editQuestion = () => {
    const token = localStorage.getItem('token');
    const payload = {
      'questions': getNewQuestions(),
      'name': quizName,
      'thumbnail': thumbnail
    }
    const options = {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
    const path = `${config.basePath}/admin/quiz/${id}`;
    fetch(path, options)
      .then(res => {
        if (!res.ok) {
          throw res;
        }
        console.log('Good Edit');
      })
      .catch(err => {
        console.log(err);
      })
  }

  // Handle submit button press
  const handleSubmit = () => {
    if (editError()) {
      return;
    }
    editQuestion();
  }

  const addAnswer = (e) => {
    e.preventDefault();
    let newAnswers = [... answers];
    if (answers.length < 6) {
      newAnswers.push(
        {
          'answerId': answers.length,
          'correct': false,
          'title': '',
          'color': null
        }
      )
    }
    // console.log(newAnswers);
    setAnswers(newAnswers);
  }

  const removeAnswer = (e) => {
    e.preventDefault();
    let newAnswers = [... answers];
    if (answers.length > 2) {
      newAnswers.pop();
    }
    // console.log(newAnswers);
    setAnswers(newAnswers);
  }

  // NEED TO DO VIDEO UPLOAD
  return (
    <div className="edit-question">
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Select Question Type</label>
          <Dropdown
            placeholder='Select Question Type'
            fluid
            selection
            value={questionType}
            onChange={(e, { value }) => { setQuestionType(value) }}
            options={questionTypes}
          />
        </Form.Field>
        <Form.Input label='Title' type='text' placeholder='Question' value={questionName} onChange={(e) => { setQuestionName(e.target.value) }} />
        <Form.Field>
          <label>Select Time Limit</label>
          <Dropdown
            placeholder='Select Time Limit'
            fluid
            selection
            value={duration}
            onChange={(e, { value }) => { setDuration(value) }}
            options={durationList}
          />
        </Form.Field>
        <Form.Field>
          <label>Select Points</label>
          <Dropdown
            placeholder='Select Points'
            fluid
            selection
            value={points}
            onChange={(e, { value }) => { setPoints(value) }}
            options={pointsList}
          />
        </Form.Field>
        <Form.Field>
          <label>Upload Image</label>
          <input type="file" onChange={(e) => { setAttach(e.target.value) }} />
        </Form.Field>
        <Form.Input label='Video URL' type='text' placeholder='URL' onChange={(e) => { setAttach(e.target.value) }} />
        <Button onClick={addAnswer}>Add Answer</Button>
        <Button onClick={removeAnswer}>Remove Answer</Button>
        {answers.map((answer, idx) => (
          <AnswerInput key={answer.answerId}
                       answeridx={idx} 
                       answersState={answers} 
                       setAnswersState={setAnswers}/>
        ))}
        <Button type='submit'>Submit</Button>
      </Form>
    </div>
  )
}

AnswerInput.propTypes = {
  answeridx: PropTypes.number,
  answersState: PropTypes.array,
  setAnswersState: PropTypes.func,
}


export default EditQuestion;