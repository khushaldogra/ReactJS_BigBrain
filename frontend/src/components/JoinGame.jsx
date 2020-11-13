import React, { useState } from 'react';
import { Container, Header, Input, Button } from 'semantic-ui-react';

// USELESS FOR NOW
function JoinGame() {
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
        content='Enter code!'
        style={{
          fontSize: '1.7em',
          fontWeight: 'normal',
          marginTop: '1.5em',
        }}
      />
      <Input focus placeholder="Session ID" />
      <Input focus placeholder="Enter name" />
      <Button primary size='big'>Play</Button>
    </Container>

  )
}

export default JoinGame;