import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Button, Card, Modal, Input,
} from 'semantic-ui-react';

import CardTemplate from './Card';
import config from '../config';

const Dashboard = () => {
  const history = useHistory();
  const location = useLocation();
  const [quizzes, setQuizzes] = useState([]);
  const [quizname, setQuizname] = useState('');
  const [open, setOpen] = useState(false);
  const [openResults, setOpenResults] = useState(false);
  const [quizActive, setQuizActive] = useState('');
  const [currentQuizId, setCurrentQuizId] = useState(0);
  const [updateGames, setUpdateGames] = useState(true);

  // stop logged out user from accessing Dashboard
  useEffect(() => {
    if (!localStorage.token) {
      // alert("Invalid token")
      history.push('/');
    }
  }, [history, location]);

  useEffect(() => {
    // extract data of all games - fetch
    fetch(`${config.basePath}/admin/quiz`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw Error(data.error);
        }
        // console.log(data["quizzes"][0])
        // quizzes = data['quizzes'].map((p,i) => renderCards(p,i))
        setQuizzes(data.quizzes);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [updateGames]);

  // dashboard of all games is displayed - display cards
  const addQuiz = () => {
    fetch(`${config.basePath}/admin/quiz/new`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: quizname,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw Error;
      })
      // remove quiz var here
      .then(() => {
        setUpdateGames(!updateGames);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // routing props - send session id not through url
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.host}/game/${currentQuizId}/${quizActive}`);
    setOpen(false);
    alert('link copied');
  };

  const redirectResults = () => {
    history.push(`/results/${quizActive}`);
  };

  return (
    <div>
      <span>Dashboard</span>
      {/* Display cards */}
      <Card.Group>
        {/* Removed index from map */}
        {quizzes.map((quiz) => (
          <CardTemplate
            key={quiz.id}
            quizInfo={quiz}
            setCurrentQuizId={setCurrentQuizId}
            setOpenResults={setOpenResults}
            setOpen={setOpen}
            setQuizActive={setQuizActive}
            updateGames={updateGames}
            setUpdateGames={setUpdateGames}
          />
        ))}
      </Card.Group>
      <br />

      <Input type="text" placeholder="Enter name of new quiz" action onChange={(e, { value }) => setQuizname(value)}>
        <input />
        <Button type="submit" onClick={addQuiz}>Create Quiz</Button>
      </Input>

      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header>Game Code</Modal.Header>
        <Modal.Content>
          Session ID:
          {' '}
          {quizActive}
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button
            content="Copy Link"
            labelPosition="right"
            icon="copy"
            onClick={handleCopyLink}
            positive
          />
        </Modal.Actions>
      </Modal>

      <Modal
        onClose={() => setOpenResults(false)}
        onOpen={() => setOpenResults(true)}
        open={openResults}
      >
        <Modal.Header>Results</Modal.Header>
        <Modal.Content>
          Would you like to view the results?
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpenResults(false)}>
            Close
          </Button>
          <Button
            content="Yes"
            labelPosition="right"
            icon="checkmark"
            onClick={redirectResults}
            positive
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default Dashboard;

// landing page - login - dashboard - pages
