import React, { useState } from 'react';
// import { Button } from 'semantic-ui-react';
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
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const HomepageHeading = ({ session, id }) => {
  const [sessionId, setSessionId] = useState(session)
  const [name, setName] = useState("")
  const history = useHistory()

  const playGame = () => {
    if (sessionId === "" || name === "") {
      alert("Invalid session ID or name")
    } else {
      history.push('/game/'+id+'/' + sessionId + '/playgame')
    }
  }


  return(
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
        content='Enter code!'

        style={{
          fontSize: '1.7em',
          fontWeight: 'normal',
          marginTop: '1.5em',
        }}
      />
      <Input focus placeholder="Session ID" value={sessionId} onChange={(e,{value}) => setSessionId(value)} />
      <br /> <br />
      <Input focus placeholder="Enter name" onChange={(e, {value}) => setName(value)}/>
      <br /> <br />
      <Button primary size='big' onClick={playGame}> 
        Play
      </Button>
      {/* <Button primary size='huge'>
        Get Started
        <Icon name='right arrow' />
      </Button> */}
    </Container>
  )}

const Game = () => {
    const history = useHistory();
    const { id, sessionId } = useParams();
    return (
        <Visibility
          once={false}
        >
          <Segment
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em'}}
            id='home-component'
            vertical
          >
            <HomepageHeading session={sessionId} id={id}/>
          </Segment>
        </Visibility>
    )
}

HomepageHeading.propTypes = {
  session : PropTypes.string,
  id : PropTypes.string
}

export default Game;