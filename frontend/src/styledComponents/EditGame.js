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
`;

const AddQuestionButton = styled(Button)`
  &&& {
    font-size: 1.5em;
    color: white;
    margin: 1%;
    width: 200px;
    height: 80px;

    @media (max-width: 550px) {
      width: 70px;
      height: 50px;
      font-size: 0.7em;
    }
  }
`;

const QuestionBox = styled.div`
  margin: 0% 1%;
  padding: 1%;
  box-shadow: 0px 0px 5px #a3a3a3;
  background-color: white;
`;

const GameOptions = styled.div`
  display: flex;
  align-items: center;
`;

const ImportLabel = styled.label`
  font-size: 1.5em;
`;

const GameDataDiv = styled.div`
  margin: 0px 25px;
`;

export {
  AddQuestionButton, EditGameBody, QuestionBox, GameOptions, ImportLabel,
  GameDataDiv,
};
