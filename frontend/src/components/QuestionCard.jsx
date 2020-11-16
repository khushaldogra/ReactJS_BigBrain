import React from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import { Card, Button } from 'semantic-ui-react';
import config from '../config';
import { StyledQuestionCard, ButtonGroup , CardButton } from '../styledComponents/QuestionCard'

function QuestionCard(props) {
  const quizID = useParams().id;
  const json = props.json;
  // console.log(props);
  // console.log(props.json);
  // console.log(json.questionID);

  // Return new list with question removed
  const getNewQuestions = () => {
    const newQuestions = [...props.questions];
    let index = 0;
    for (const question of newQuestions) {
      if (question.questionId === json.questionId) {
        index = newQuestions.indexOf(question);
      }
    }
    newQuestions.splice(index, 1);
    return newQuestions;
  }

  // Deletes a question from quiz
  const deleteQuestion = () => {
    console.log('delete');
    const token = localStorage.getItem('token');
    const payload = {
      'questions': getNewQuestions(),
      'name': props.quizName,
      'thumbnail': props.thumbnail
    }
    const options = {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
    const path = `${config.basePath}/admin/quiz/${quizID}`;
    fetch(path, options)
      .then(res => {
        if (!res.ok) {
          throw res;
        }
        console.log('Good delete');
        props.setQuestionChange(!props.questionChange);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <StyledQuestionCard>
      <Card.Content>
        <Card.Header content={json.name} />
        <Card.Meta content={json.type} />
        <Card.Meta content={`${json.points} points`} />
      </Card.Content>
      <ButtonGroup>
        <Link to={{
          pathname: `/game/edit/${quizID}/${json.questionId}`,
          state: {
            questions: props.questions,
            quizName: props.quizName,
            thumbnail: props.thumbnail,
            questionJSON: json
          }
        }}>
          <CardButton>Edit Question</CardButton>
        </Link>
        <CardButton onClick={deleteQuestion}>Delete Question</CardButton>
      </ButtonGroup>
    </StyledQuestionCard>
  )
}
// {`/game/edit/${quizID}/${json.questionID}`}

QuestionCard.propTypes = {
  json: PropTypes.any,
  questionChange: PropTypes.bool,
  setQuestionChange: PropTypes.func,
  questions: PropTypes.array,
  quizName: PropTypes.string,
  thumbnail: PropTypes.string
}

export default QuestionCard;