import React, { useEffect, useState } from 'react';
import {
  Button, Card, Image,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import config from '../config';

const CardTemplate = (props) => {
  const history = useHistory();
  const {
    quizInfo, setOpen, setQuizActive, setOpenResults, setCurrentQuizId,
    updateGames, setUpdateGames,
  } = props;
  const [question, setQuestion] = useState(0);
  const [totaltime, setTotaltime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [quiz, setQuiz] = useState({});

  useEffect(() => {
    fetch(`${config.basePath}/admin/quiz/${quizInfo.id}`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setQuiz(data);
        if (data.questions) {
          setQuestion(data.questions.length);
          let time = 0;
          data.questions.forEach((ques) => {
            time += ques.duration;
          });
          setTotaltime(time);
        }
        // fetch to check status of quiz
        // fetch(config.basePath + '/admin/session/' + quizInfo.active + '/status', {
        //   method : 'get',
        //   headers : {
        //     'Authorization' : 'Bearer ' + localStorage['token'],
        //     'Content-type': 'application/json'
        //   }
        // })
        // .then(res => res.json())
        // .then(data => {
        //   if (data.error) {
        //     throw Error(data.error)
        //   }
        //   console.log(data)
        //   setQuizActive(data.active)
        // })
        // .catch(err => {
        //   alert(err.message)
        // })
        if (quizInfo.active != null) {
          setIsPlaying(true);
        }
      });
  }, [quizInfo]);

  // quizInfo.active, quizInfo.id
  const deleteQuiz = () => {
    fetch(`${config.basePath}/admin/quiz/${quizInfo.id}`, {
      method: 'delete',
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw Error;
      })
      // removed quizInfo in brackets
      .then(() => {
        setUpdateGames(!updateGames);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const startQuiz = (e) => {
    e.preventDefault();
    // After starting, call the GET for the quizid to get the sesion ID.

    // call start quiz
    fetch(`${config.basePath}/admin/quiz/${quizInfo.id}/start`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw Error(data.error);
        }
        // call GET for quizId to get session ID
        fetch(`${config.basePath}/admin/quiz/${quizInfo.id}`, {
          method: 'get',
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        // handle other errors - 500, 404 ***
          .then((res) => res.json())
          .then((quizData) => {
            if (quizData.error) {
              throw Error(quizData.error);
            }
            setQuiz(quizData);
            setIsPlaying(true);
            setQuizActive(quizData.active);
            setCurrentQuizId(quizInfo.id);
            setOpen(true);
          })
          .catch((err) => {
            alert(err.message);
          });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // check this ***
  const stopQuiz = (e) => {
    e.preventDefault();
    // fetch - stop quiz
    fetch(`${config.basePath}/admin/quiz/${quizInfo.id}/end`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw Error(data.error);
        }
        setIsPlaying(false); // this after successful api call
        setQuizActive(quiz.active);

        setOpenResults(true);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src={quizInfo.thumbnail}
          // x icon on card ********
          // label={{ as: 'a', color: 'red', corner: 'right', icon: 'close' }}
        />
        <Card.Header>
          Title:
          {' '}
          {quizInfo.name}
        </Card.Header>
        <Card.Meta>
          Number of questions:
          {' '}
          {question}
        </Card.Meta>
        <Card.Description>
          Total time to complete:
          {' '}
          {totaltime}
        </Card.Description>
        <br />
        <Button icon="pencil alternate" size="small" onClick={() => history.push(`/game/edit/${quizInfo.id}`)} />
        {/* Padding left style ***  */}
        {isPlaying

          ? <Button data-testid="start" className="startButton" icon="pause" color="red" size="small" onClick={stopQuiz} />
          : <Button className="startButton" icon="play" color="green" size="small" onClick={startQuiz} />}
        <Button compact color="red" floated="right" onClick={deleteQuiz}>Delete</Button>
      </Card.Content>
    </Card>
  );
};

CardTemplate.propTypes = {
  quizInfo: PropTypes.object.isRequired,
  setOpen: PropTypes.func,
  setQuizActive: PropTypes.func,
  setOpenResults: PropTypes.func,
  setCurrentQuizId: PropTypes.func,
  updateGames: PropTypes.bool,
  setUpdateGames: PropTypes.func,
};
export default CardTemplate;

/// quizes - data - dashboard
// quiz - data - card - changes
