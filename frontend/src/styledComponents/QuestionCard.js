import styled from 'styled-components';
import { Card, Button } from 'semantic-ui-react';

const StyledQuestionCard = styled(Card)`
  &&& {
    width: 350px;
    padding: 0.5%;
    background-color: #f2f2f2;
  }
`

const ButtonGroup = styled(Card.Content)`
  &&& {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

const CardButton = styled(Button)`
  &&& {
    height: 50px;
    background-color: #1368ce;
    color: white;

    &:hover {
      background-color: #004496;
    }

    &:focus {
      background-color: #004496;
    }
  }
`
export { StyledQuestionCard, ButtonGroup, CardButton }