import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  Segment,
  Visibility,
  Embed,
} from 'semantic-ui-react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { GameHeading, GameSubheading } from '../styledComponents/PlayGame';
import config from '../config';

// else {
//       history.push('/game/'+id+'/' + sessionId + '/playgame')
//     }

// quizID and sessionID
const HomepageHeading = ({ session, id }) => {
  const sessionId = session;
  const [quiz, setQuiz] = useState({
    questions: [],
  });
  const [position, setPosition] = useState(-1);
  // const [playerId, setPlayerId] = useState('');
  const history = useHistory();
  const advance = () => {
    fetch(`${config.basePath}/admin/quiz/${id}/advance`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        'Content-Type': 'Application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.stage === quiz.questions.length) {
          alert('game complete');
          history.push('/dashboard');
        } else {
          setPosition(position + 1);
        }
      });
  };
  useEffect(() => {
    // api to get quiz info
    fetch(`${config.basePath}/admin/quiz/${id}`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        'Content-Type': 'Application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setQuiz(res);
        // api for status
        fetch(`${config.basePath}/admin/session/${sessionId}/status`, {
          method: 'get',
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
            'Content-Type': 'Application/json',
          },
        })
          .then((data) => data.json())
          .then((data) => {
            setPosition(data.results.position);
          });
      });
  }, [id, sessionId]);

  return (
    <Container text color="red">
      <GameHeading>BigBrain Game</GameHeading>
      {position === -1
        ? (
          <div>
            <GameSubheading>Join with code!</GameSubheading>
            <GameSubheading>{sessionId}</GameSubheading>

            <br />
            {' '}
            <br />

            <Button primary size="big" onClick={advance}>
              Start game
            </Button>
          </div>
        )
        : (
          <div>
            <div>{quiz.questions[position].name}</div>

            <Embed
              icon="play"
              id="TwjmAfpvYPc"
              placeholder="/images/image-16by9.png"
              url="https://www.youtube.com/watch?v=TwjmAfpvYPc&list=PLHnAh9gM7bwGcdxjzPLjnESAOyyswCd_U&index=1"
              source="youtube"
            />
            {quiz.questions[position].answers.map((answer, index) => (
              <Button key={index}>{answer.answerId}</Button>
            ))}
            <br />
            <br />
            <div>
              <Button onClick={advance}>Next</Button>
            </div>
          </div>
        )}
      {/* <Button primary size='huge'>
        Get Started
        <Icon name='right arrow' />
      </Button> */}
    </Container>
  );
};

const Admin = () => {
  const { id, sessionId } = useParams();
  return (
    <Visibility
      once={false}
    >
      <Segment
        textAlign="center"
        style={{ minHeight: 700, padding: '1em 0em' }}
        id="home-component"
        vertical
      >
        <HomepageHeading session={sessionId} id={id} />
      </Segment>
    </Visibility>
  );
};

HomepageHeading.propTypes = {
  session: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Admin;
