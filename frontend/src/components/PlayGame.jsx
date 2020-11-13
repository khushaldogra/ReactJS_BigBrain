import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
  Input
} from 'semantic-ui-react'
import PropTypes from 'prop-types';
import config from '../config';

const PlayGamepage = ({ id, sessionId }) => {
  const [quizdata, setQuizdata] = useState({})
  useEffect(() => {
    fetch(config.basePath + '/admin/quiz/' + id, {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + localStorage['token'],
        'Content-Type': 'Application/json'
      },
    })
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log(data)
        setQuizdata(data)
      })
  }, [])

  return (
    <Container text color='red'>
      <Header
        as='h1'
        content='BigBrain Game'

        style={{
          fontSize: '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: '3em',
        }}
      />
      <Header
        as='h2'
        // questions here ***
        // content={quizdata.questions[0].question}

        style={{
          fontSize: '1.7em',
          fontWeight: 'normal',
          marginTop: '1.5em',
        }}
      />
      <Button primary size='big'>
        Play
        </Button>
    </Container>
  )
}


const PlayGame = () => {
  const { id, sessionId } = useParams()
  return (
    <Visibility
      once={false}
    >
      <Segment
        textAlign='center'
        style={{ minHeight: 700, padding: '1em 0em' }}
        id='playgame-component'
        vertical
      >
        <PlayGamepage id={id} sessionId={sessionId} />
      </Segment>
    </Visibility>
  )
}

export default PlayGame;

PlayGamepage.propTypes = {
  sessionId: PropTypes.string,
  id: PropTypes.string
}


/// currentIndex (state)
//  of questions question 1  --- next

// every input from user is state