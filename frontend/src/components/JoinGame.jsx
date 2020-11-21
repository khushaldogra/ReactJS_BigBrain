import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { JoinGameBody, BigBrainTitle, JoinInput, JoinButton } from '../styledComponents/JoinGame';
import config from '../config';

function JoinGame() {
  const [sessionID, setSessionID] = useState(0);
  const [name, setName] = useState('');
  const history = useHistory();

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
    fetch(path, options)
      .then(res => {
        if(!res.ok) {
          throw res;
        }
        return res.json()
      })
      .then(data => {
        // Go to the game
        history.push(`/game/${sessionID}/playgame/${data.playerId}`);
      })
      .catch(err => {
        err.json()
          .then(json => {
            alert(json.error);
          });
      })
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