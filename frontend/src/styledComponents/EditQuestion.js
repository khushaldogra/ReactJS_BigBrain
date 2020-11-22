import styled from 'styled-components';
import { Form, Button } from 'semantic-ui-react';

const EditQuestionBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: #f2f2f2;
  padding: 2% 6%;
`;

const QuestionForm = styled(Form)`
  &&& {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const TitleField = styled(Form.Field)`
  &&& {
    width: 100%;
    font-size: 2em;
  }
`;

const TitleInput = styled.input`
  height: 100px;
`;

const QuestionParameters = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0% 2%;
`;

const ParamColumn = styled.div`
  width: 30%;
`;

const ButtonColumn = styled(ParamColumn)`
  padding: 20px 10px;
`;

const QuestionAnswers = styled.div`
  margin: 50px 0px;
  width: 95%;
  display: flex;
  flex-wrap: wrap;
`;

const AnswerField = styled(Form.Field)`
  &&& {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #82ca9d;
    width: 49%;
    height: 90px;
    margin: 4px;
    padding: 10px;
    font-size: 1.2em;
    border-radius: 5px;
    border: 1px solid lightgrey;

    @media (max-width: 955px) {
      width: 100%;
    }
  }
`;

const AnsInput = styled.input`
  height: 80%;
  background-color: pink;
`;

const AnsCheckbox = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: white;
  border-radius: 3px;
  margin: 10px;
  height: 80%;
  border: 1px solid lightgrey;
`;

const QuestionButton = styled(Button)`
  &&& {
    margin: 10px;
    font-size: 1.5em;
    color: white;

    @media (max-width: 955px) {
      font-size: 1.1em;
    }
  }
`;

export {
  EditQuestionBody, QuestionForm, TitleInput, TitleField, QuestionParameters, ParamColumn,
  ButtonColumn, QuestionAnswers, AnswerField, AnsInput, AnsCheckbox, QuestionButton,
};
