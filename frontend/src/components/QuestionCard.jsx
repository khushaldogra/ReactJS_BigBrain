import React from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import { Card, Button } from 'semantic-ui-react';
import { StyledQuestionCard, ButtonGroup , CardButton } from '../styledComponents/QuestionCard';
import { updateQuiz } from '../api';

function QuestionCard(props) {
  const quizID = useParams().id;
  const json = props.json;

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
    const newQuestions = getNewQuestions();
    updateQuiz(newQuestions, props.quizName, props.thumbnail, quizID)
      .then(() => {
        props.setQuestionChange(!props.questionChange);
      })
      .catch(err => {
        alert(err);
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
          <CardButton color='blue'>Edit Question</CardButton>
        </Link>
        <CardButton color='blue' onClick={deleteQuestion}>Delete Question</CardButton>
      </ButtonGroup>
    </StyledQuestionCard>
  )
}

QuestionCard.propTypes = {
  json: PropTypes.any,
  questionChange: PropTypes.bool,
  setQuestionChange: PropTypes.func,
  questions: PropTypes.array,
  quizName: PropTypes.string,
  thumbnail: PropTypes.string
}

export default QuestionCard;