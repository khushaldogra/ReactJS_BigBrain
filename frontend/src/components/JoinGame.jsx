import React, { useState } from 'react';
import { JoinGameBody, BigBrainTitle, JoinInput, JoinButton } from '../styledComponents/JoinGame';

function JoinGame() {
  const [sessionID, setSessionID] = useState(0);
  const [name, setName] = useState('');

  const joinGame = () => {
    if (sessionID === "" || name === "") {
      alert("Invalid session ID or empty name");
    }
    
    const payload = {
      'name': name
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
    const path = `${config.basePath}/play/join/${sessionID}`;
    
    // Do fetch
  }

  return (
    <JoinGameBody>
      <BigBrainTitle>BigBrain Game!</BigBrainTitle>
      <JoinInput placeholder="Session ID" onChange={(e) => setSessionID(e.target.value)} />
      <JoinInput placeholder="Name" onChange={(e) => setName(e.target.value)}/>
      <JoinButton color='black' size='big' onClick={joinGame}>Play</JoinButton>
    </JoinGameBody>
  )
}

export default JoinGame;