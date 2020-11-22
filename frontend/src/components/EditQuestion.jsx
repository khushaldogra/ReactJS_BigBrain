import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Dropdown, Checkbox } from 'semantic-ui-react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import {
  EditQuestionBody, QuestionForm, TitleInput, TitleField, QuestionParameters, ParamColumn,
  ButtonColumn, QuestionAnswers, AnswerField, AnsInput, AnsCheckbox, QuestionButton,
} from '../styledComponents/EditQuestion';
import updateQuiz from '../api';

// Answer input component for a new answer in quiz
function AnswerInput({ answeridx, answersState, setAnswersState }) {
  const handleInput = (e) => {
    const newAnswers = [...answersState];
    newAnswers[answeridx].title = e.target.value;
    setAnswersState(newAnswers);
  };

  const handleCheckbox = () => {
    const newAnswers = [...answersState];
    newAnswers[answeridx].correct = !newAnswers[answeridx].correct;
    setAnswersState(newAnswers);
  };

  return (
    <AnswerField>
      <AnsInput aria-label={`Answer ${answeridx + 1}`} placeholder={`Answer ${answeridx + 1}`} value={answersState[answeridx].title} onChange={handleInput} />
      <AnsCheckbox>
        <Checkbox
          label="Correct"
          defaultChecked={answersState[answeridx].correct}
          onChange={handleCheckbox}
        />
      </AnsCheckbox>
    </AnswerField>
  );
}

function EditQuestion() {
  const location = useLocation();
  const history = useHistory();
  const {
    questions, quizName, thumbnail, questionJSON,
  } = location.state;
  const { id, questionId } = useParams();

  const [questionType, setQuestionType] = useState(questionJSON.type);
  const [questionName, setQuestionName] = useState(questionJSON.name);
  const [duration, setDuration] = useState(questionJSON.duration);
  const [points, setPoints] = useState(questionJSON.points);
  const [attach, setAttach] = useState(questionJSON.videolink);
  const [answers, setAnswers] = useState(questionJSON.answers);

  // List of question types to pick
  const questionTypes = [
    {
      text: 'Multiple Choice',
      value: 'Multiple Choice',
    },
    {
      text: 'Single Choice',
      value: 'Single Choice',
    },
  ];

  // List of durations to pick
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
  ];

  // List of points to pick
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
  ];

  // Returns new list with question edited
  const getNewQuestions = () => {
    const newQuestions = [...questions];
    for (const json of newQuestions) {
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
  };

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
  };

  // Fetch to edit question
  const editQuestion = () => {
    const newQuestions = getNewQuestions();
    updateQuiz(newQuestions, quizName, thumbnail, id)
      .catch((err) => {
        err.json()
          .then((json) => {
            alert(json.error);
          });
      });
  };

  // Handle submit button press
  const handleSubmit = () => {
    if (editError()) {
      return;
    }
    editQuestion();
    history.push(`/game/edit/${id}`);
  };

  // Adds an answer to question
  const addAnswer = (e) => {
    e.preventDefault();
    const newAnswers = [...answers];
    if (answers.length < 6) {
      newAnswers.push(
        {
          answerId: answers.length,
          correct: false,
          title: '',
          color: null,
        },
      );
    }
    setAnswers(newAnswers);
  };

  // Removes an answer from question
  const removeAnswer = (e) => {
    e.preventDefault();
    const newAnswers = [...answers];
    if (answers.length > 2) {
      newAnswers.pop();
    }
    setAnswers(newAnswers);
  };

  return (
    <EditQuestionBody>
      <QuestionForm onSubmit={handleSubmit}>
        <TitleField>
          <TitleInput aria-label="Title" type="text" placeholder="Question" value={questionName} onChange={(e) => { setQuestionName(e.target.value); }} />
        </TitleField>
        <QuestionParameters>
          <ParamColumn>
            <Form.Field>
              <label htmlFor="question-type">Select Question Type</label>
              <Dropdown
                id="question-type"
                placeholder="Select Question Type"
                fluid
                selection
                value={questionType}
                onChange={(e, { value }) => { setQuestionType(value); }}
                options={questionTypes}
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="time-limit">Select Time Limit</label>
              <Dropdown
                id="time-limit"
                placeholder="Select Time Limit"
                fluid
                selection
                value={duration}
                onChange={(e, { value }) => { setDuration(value); }}
                options={durationList}
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="select-points">Select Points</label>
              <Dropdown
                id="select-points"
                placeholder="Select Points"
                fluid
                selection
                value={points}
                onChange={(e, { value }) => { setPoints(value); }}
                options={pointsList}
              />
            </Form.Field>
          </ParamColumn>
          <ParamColumn>
            <Form.Field>
              <label htmlFor="upload-image">Upload Image</label>
              <input id="upload-image" type="file" onChange={(e) => { setAttach(e.target.files[0]); }} />
            </Form.Field>
            <p>OR</p>
            <Form.Input label="Video URL" type="text" placeholder="URL" onChange={(e) => { setAttach(e.target.value); }} />
          </ParamColumn>
          <ButtonColumn>
            <QuestionButton color="blue" onClick={addAnswer}>Add Answer</QuestionButton>
            <QuestionButton color="blue" onClick={removeAnswer}>Remove Answer</QuestionButton>
          </ButtonColumn>
        </QuestionParameters>
        <QuestionAnswers>
          {answers.map((answer, idx) => (
            <AnswerInput
              key={answer.answerId}
              answeridx={idx}
              answersState={answers}
              setAnswersState={setAnswers}
            />
          ))}
        </QuestionAnswers>
        <QuestionButton color="blue" type="submit">Change Question</QuestionButton>
      </QuestionForm>
    </EditQuestionBody>
  );
}

AnswerInput.propTypes = {
  answeridx: PropTypes.number,
  answersState: PropTypes.array,
  setAnswersState: PropTypes.func,
};

export default EditQuestion;
