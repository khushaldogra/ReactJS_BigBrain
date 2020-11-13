import React, { useState } from 'react';
import { Button, Form, Dropdown, Checkbox, Input } from 'semantic-ui-react'
import config from '../config';
import { useParams, useLocation } from 'react-router-dom';

function EditQuestion() {
  const location = useLocation();
  const { questions, quizName, thumbnail, questionJSON } = location.state;
  const { id, questionID } = useParams();

  const [questionType, setQuestionType] = useState(questionJSON.type);
  const [question, setQuestion] = useState(questionJSON.question);
  const [timeLimit, setTimeLimit] = useState(questionJSON.time);
  const [points, setPoints] = useState(questionJSON.points);
  const [attach, setAttach] = useState(questionJSON.URL);
  const [answers, setAnswers] = useState(questionJSON.answers);
  const [correctAnswers, setCorrectAnswers] = useState(questionJSON.correctAnswers);

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

  const timeLimits = [
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
      if (json.questionID === parseInt(questionID)) {
        json.type = questionType;
        json.question = question;
        json.time = timeLimit;
        json.points = points;
        json.URL = attach; // CHANGE THIS INTO A URL THAT CAN ACTUALLY WORK
        json.answers = answers;
        json.correctAnswers = correctAnswers;
      }
    }
    return newQuestions;
  }

  // Error handling for question editing
  const editError = () => {
    // Empty field error handling?

    // Single/Multiple Choice
    let correct = 0;
    for (const answer of correctAnswers) {
      if (answer === true) {
        correct++;
      }
    }
    if (questionType === 'Single Choice' && correct !== 1) {
      console.log('Please select only 1 answer or select multiple choice');
      return true;
    }
    if (questionType === 'Multiple Choice' && correct === 1) {
      console.log('Please select more than 1 answer or select single choice');
      return true;
    }
    return false;
  }

  const editQuestion = () => {
    // Error Handling
    if (editError()) {
      return;
    }

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
    editQuestion();
  }

  // Text input handler for answers
  const handleAnswer = (answer, num) => {
    let newAnswers = [...answers];
    newAnswers[num] = answer;
    setAnswers(newAnswers);
  }

  // Checkbox handler for answers
  const handleCheckbox = (num) => {
    let newCorrectAnswers = [...correctAnswers];
    const correct = correctAnswers[num] === true ? false : true;
    newCorrectAnswers[num] = correct;
    setCorrectAnswers(newCorrectAnswers);
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
        <Form.Input label='Question' type='text' placeholder='Question' value={question} onChange={(e) => { setQuestion(e.target.value) }} />
        <Form.Field>
          <label>Select Time Limit</label>
          <Dropdown
            placeholder='Select Time Limit'
            fluid
            selection
            value={timeLimit}
            onChange={(e, { value }) => { setTimeLimit(value) }}
            options={timeLimits}
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
        <Form.Field>
          <label>Answer 1</label>
          <Input defaultValue={answers[0]} onChange={(e) => { handleAnswer(e.target.value, 0) }} />
          <Checkbox label='Correct Answer' defaultChecked={correctAnswers[0]} onChange={() => { handleCheckbox(0) }} />
        </Form.Field>
        <Form.Field>
          <label>Answer 2</label>
          <Input defaultValue={answers[1]} onChange={(e) => { handleAnswer(e.target.value, 1) }} />
          <Checkbox label='Correct Answer' defaultChecked={correctAnswers[1]} onChange={() => { handleCheckbox(1) }} />
        </Form.Field>
        <Form.Field>
          <label>Answer 3</label>
          <Input defaultValue={answers[2]} onChange={(e) => { handleAnswer(e.target.value, 2) }} />
          <Checkbox label='Correct Answer' defaultChecked={correctAnswers[2]} onChange={() => { handleCheckbox(2) }} />
        </Form.Field>
        <Form.Field>
          <label>Answer 4</label>
          <Input defaultValue={answers[3]} onChange={(e) => { handleAnswer(e.target.value, 3) }} />
          <Checkbox label='Correct Answer' defaultChecked={correctAnswers[3]} onChange={() => { handleCheckbox(3) }} />
        </Form.Field>
        <Form.Field>
          <label>Answer 5</label>
          <Input defaultValue={answers[4]} onChange={(e) => { handleAnswer(e.target.value, 4) }} />
          <Checkbox label='Correct Answer' defaultChecked={correctAnswers[4]} onChange={() => { handleCheckbox(4) }} />
        </Form.Field>
        <Form.Field>
          <label>Answer 6</label>
          <Input defaultValue={answers[5]} onChange={(e) => { handleAnswer(e.target.value, 5) }} />
          <Checkbox label='Correct Answer' defaultChecked={correctAnswers[5]} onChange={() => { handleCheckbox(5) }} />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    </div>
  )
}

export default EditQuestion;