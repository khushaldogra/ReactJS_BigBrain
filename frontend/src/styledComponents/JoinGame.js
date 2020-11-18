import styled from 'styled-components';
import { Input, Button } from 'semantic-ui-react';

const JoinGameBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  background-color: #42bedf;
  padding: 2%;
`

const JoinInput = styled(Input)`
  &&& {
    width: 350px;
    height: 70px;
    font-size: 1.5em;
    margin: 10px;
  }
`

const BigBrainTitle = styled.h1`
  color: white;
  font-size: 4em;
`

const JoinButton = styled(Button)`
  &&& {
    width: 350px;
    height: 70px;
    font-size: 2em;
    margin: 10px;
  }
`

export { JoinGameBody, BigBrainTitle, JoinInput, JoinButton }