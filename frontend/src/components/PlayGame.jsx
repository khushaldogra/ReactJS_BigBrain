import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Container,
  Segment,
  Visibility,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { GameButton, GameHeading, GameSubheading } from '../styledComponents/PlayGame';
import config from '../config';

const PlayGamepage = ({ sessionId }) => {
  const { playerId } = useParams();
  const history = useHistory();

  const [currentQn, setCurrentQn] = useState({
    answers: [],
  });
  const [quizstart, setQuizstart] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [correctAns, setCorrectAns] = useState([]);
  const [correctAnsIds, setCorrectAnsIds] = useState([]);
  const [error, setError] = useState('');
  const [answeridArray, setAnsweridArray] = useState([]);
  const [activequiz, setActivequiz] = useState(false);

  // submit api here
  const submitAnswer = (index) => {
    let tempArray = [...answeridArray];
    if (answeridArray.includes(index)) {
      // Remove value from answer id array
      tempArray = tempArray.filter((id) => id !== index);
      setAnsweridArray(tempArray);
    } else {
      // Add value to answer id array
      tempArray.push(index);
      setAnsweridArray(tempArray);
    }
    fetch(`${config.basePath}/play/${playerId}/answer`, {
      method: 'put',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({
        answerIds: tempArray,
      }),
    })
      .then((res) => res.json());
  };

  useEffect(() => {
    // api for active status
    fetch(`${config.basePath}/play/${playerId}/status`, {
      method: 'get',
      headers: {
        'Content-Type': 'Application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.started) {
          setActivequiz(true);
          setError('');
          fetch(`${config.basePath}/play/${playerId}/question`, {
            method: 'get',
            headers: {
              'Content-Type': 'Application/json',
            },
          })
            .then((resp) => resp.json())
            .then((data) => {
              if (!data.error) {
                setCurrentQn(data.question);
                const timeLeftNew = data.question.duration - (new Date()
                                      - new Date(data.question.isoTimeLastQuestionStarted)) / 1000;

                if (timeLeftNew <= 0) {
                  setTimeLeft(0);
                  setAnsweridArray([]);
                  setQuizstart(quizstart + 1);
                  // eslint-disable-next-line
                }
                else {
                  setQuizstart(0);
                  setCorrectAns([]);
                  setCorrectAnsIds([]);
                  setTimeLeft(timeLeftNew);
                }
              }
            })
            .catch((err) => {
              alert(err);
            });
        } else if (activequiz) {
          history.push(`/results/player/${playerId}`);
        } else {
          setQuizstart(quizstart + 1);
          setTimeLeft(0);
          setError('Session Not Started');
        }
      });
  }, [activequiz, history, playerId, quizstart, sessionId, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      fetch(`${config.basePath}/play/${playerId}/answer`, {
        method: 'get',
        headers: {
          'Content-Type': 'Application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            const temp = [];
            setCorrectAnsIds(data.answerIds);
            data.answerIds.forEach((ansId) => {
              currentQn.answers.forEach((ans) => {
                if (ans.answerId === ansId) {
                  temp.push(ans);
                }
              });
            });
            setCorrectAns(temp);
          }
        });
    }
  }, [currentQn.answers, playerId, timeLeft]);

  return (
    <Container text color="red">
      <GameHeading content="BigBrain Game" />
      {error !== ''
        ? (
          <div>
            {error}
            {' '}
            Contact Admin and try reloading
          </div>
        ) : null}
      {currentQn ? (
        <div>
          <h2>
            Time remaining:
            {' '}
            {parseInt(timeLeft, 10)}
            {' '}
            seconds
          </h2>
          <h2>{currentQn.type}</h2>
          <GameSubheading content={currentQn.name} />
          {currentQn.answers.map((answer) => (
            <GameButton
              // eslint-disable-next-line
              className={`option ${correctAnsIds.includes(answer.answerId) ? 'correctOption'
                : (timeLeft === 0 ? 'incorrectOption' : '')}${answeridArray.includes(answer.answerId) ? 'activeOption' : ''}`}
              size="massive"
              key={answer.answerId}
              onClick={() => submitAnswer(answer.answerId)}
            >
              {answer.title}
            </GameButton>
          ))}
          {timeLeft === 0
            ? <div>Correct answers</div>
            : null}
          {correctAns.map((answer) => (
            <div key={answer.answerId}>
              {answer.answerId}
              {' '}
              :
              {' '}
              {answer.title}
            </div>
          ))}
        </div>
      )
        : <div>Game not yet started</div>}
    </Container>
  );
};

const PlayGame = () => {
  const { id, sessionId } = useParams();
  return (
    <Visibility
      once={false}
    >
      <Segment
        textAlign="center"
        style={{ minHeight: 700, padding: '1em 0em' }}
        id="playgame-component"
        vertical
      >
        <PlayGamepage id={id} sessionId={sessionId} />
      </Segment>
    </Visibility>
  );
};

export default PlayGame;
PlayGamepage.propTypes = {
  sessionId: PropTypes.string.isRequired,
};
