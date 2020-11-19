import React from "react";
import { shallow } from "enzyme";
import Register from './components/Register';
import QuestionCard from './components/QuestionCard';
import { Form, Card } from 'semantic-ui-react';
import { CardButton } from './styledComponents/QuestionCard';

// Mock React Router Dom
const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  useParams: () => ({
    id: 0
  }),
}));

describe('Register', () => {
  it('Email input onChange', () => {
    const register = shallow(<Register />);
    expect(register.find('input').at(0).prop('value')).toEqual('');
    register.find('input').at(0).simulate('change', { target: { value: 'email@email' } });
    expect(register.find('input').at(0).prop('value')).toEqual('email@email');
  });

  it('Name input onChange', () => {
    const register = shallow(<Register />);
    expect(register.find('input').at(1).prop('value')).toEqual('');
    register.find('input').at(1).simulate('change', { target: { value: 'name' } });
    expect(register.find('input').at(1).prop('value')).toEqual('name');
  });

  it('Password input onChange', () => {
    const register = shallow(<Register />);
    expect(register.find('input').at(2).prop('value')).toEqual('');
    register.find('input').at(2).simulate('change', { target: { value: 'password' } });
    expect(register.find('input').at(2).prop('value')).toEqual('password');
  });

  it('Form submit', () => {
    let mock = jest.fn();
    const registerForm = shallow(
      <Form onSubmit={mock}>
      </Form>
    );
    registerForm.simulate('submit');
    expect(mock).toBeCalledTimes(1);
  });
});

function createDummyCard(dummyjson) {
  return <QuestionCard json={dummyjson} />
}

describe('Question Card', () => {
  const dummyQuestion = {
    "type": "Single Choice",
    "name": "Question 2",
    "duration": 10,
    "points": 1000,
    "videolink": null,
    "questionId": 1
  }

  it('Uses json props name', () => {
    const questionCard = shallow(createDummyCard(dummyQuestion));
    expect(questionCard.find(Card.Header).props()['content']).toEqual(dummyQuestion.name);
  })

  it('Uses json props type', () => {
    const questionCard = shallow(createDummyCard(dummyQuestion));
    expect(questionCard.find(Card.Meta).at(0).props()['content']).toEqual(dummyQuestion.type);
  })

  it('Uses json props points', () => {
    const questionCard = shallow(createDummyCard(dummyQuestion));
    expect(questionCard.find(Card.Meta).at(1).props()['content']).toEqual(`${dummyQuestion.points} points`);
  })

  it('CardButton onclick', () => {
    let mock = jest.fn();
    const cardButton = shallow(<CardButton onClick={mock}>Delete Question</CardButton>);
    cardButton.simulate('click');
    expect(mock).toBeCalledTimes(1);
  })
});