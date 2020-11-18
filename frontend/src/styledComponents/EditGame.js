import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

// SHOULD EXTRACT THIS
const EditGameBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: #f2f2f2;

  @media (max-width: 600px) {
    align-items: center;
  }
`

const AddQuestionButton = styled(Button)`
  &&& {
    font-size: 1.5em;
    color: white;
    margin: 1%;
    width: 200px;
    height: 80px;
  }
`

const QuestionBox = styled.div`
  margin: 0% 1%;
  padding: 1%;
  box-shadow: 0px 0px 5px #a3a3a3;
  background-color: white;
`


export { AddQuestionButton, EditGameBody, QuestionBox }