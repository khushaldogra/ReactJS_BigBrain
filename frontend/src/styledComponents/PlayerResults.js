import styled from 'styled-components';
import { Card } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';

const PlayerResultsBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  background-color: #f2f2f2;
  padding: 1%;
`

const ResultsCard = styled(Card)`
  &&& {
    width: 800px;
    padding: 0.5%;
  }
`

const ResultTitle = styled.h1`
  color: ${props => props.correct ? 'green' : 'red'};
`

const ResultInfo = styled.p`
  font-size: 1.3em;
`

const GameResultsButton = styled(Button)`
  &&& {
    width: 300px;
    height: 60px;
    margin: 20px;
    font-size: 1.5em;
  }
`

export { PlayerResultsBody, ResultsCard, ResultTitle, ResultInfo, GameResultsButton }