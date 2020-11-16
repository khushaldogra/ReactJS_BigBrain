import styled from 'styled-components';
import { Button, Card } from 'semantic-ui-react';

// SHOULD EXTRACT THIS
const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: #f2f2f2;
`

const AddQuestionButton = styled(Button)`
  &&& {
    background-color: #1368ce;
    font-size: 1.5em;
    color: white;
    margin: 1%;
    width: 200px;
    height: 80px;

    &:hover {
      background-color: #0058c2;
    }
  }
`

const QuestionBox = styled.div`
  margin: 0% 1%;
  padding: 1%;
  box-shadow: 0px 0px 5px #a3a3a3;
  background-color: white;
`


export { AddQuestionButton, Body, QuestionBox }