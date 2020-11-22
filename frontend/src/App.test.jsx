import React from 'react';
import { shallow } from 'enzyme';
import { Form, Card, Image } from 'semantic-ui-react';
import CardTemplate from './components/Card';
import Register from './components/Register';
import QuestionCard from './components/QuestionCard';
import { CardButton } from './styledComponents/QuestionCard';
import * as AppContext from './store';

// Mock React Router Dom
const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  useParams: () => ({
    id: 0,
  }),
}));

// Mock useContext
const mockSet = jest.fn();
const mockContext = {
  loggedIn: [true, mockSet],
};

const mockObject = {
  name: 'TRIAL quiz',
  owner: 'hayden@unsw.edu.au',
  questions: [
    {
      id: 0,
      type: 'Multiple',
      name: 'What is the name of the SECOND robot invented?',
      duration: 5,
      answers: [
        {
          answerId: 'ABC1',
          correct: false,
          title: 'The dog',
          colour: 'blue',
        },
        {
          answerId: 'ABC1234',
          correct: true,
          title: 'The cat',
          colour: 'red',
        },
      ],
      videolink: 'http://...',
    },
  ],
  thumbnail: 'https://react.semantic-ui.com/images/wireframe/image.png',
};

describe('Dashboard Card', () => {
  it('Uses prop thumbnail', () => {
    const card = shallow(<CardTemplate quiz_info={mockObject} />);
    expect(card.find(Image).props().src).toEqual(mockObject.thumbnail);
  });

  it('Has all children', () => {
    const card = shallow(<CardTemplate quiz_info={mockObject} />);
    expect(card.find(Card.Content).children()).toHaveLength(8);
  });
  // it('Uses prop name', () => {
  //   const card = shallow(<CardTemplate quiz_info={mockObject} />);
  //   expect(card.find(Card.Header).text()).toEqual(`Title: ${mockObject.name}`);
  // });

  // it('Uses question length', () => {
  //   const card = shallow(<CardTemplate quiz_info={mockObject} />);
  //   expect(card.find(Card.Header).text())
  //     .toEqual(`Number of questions: ${mockObject.questions.length}`);
  // });
});

describe('Register', () => {
  it('Email input onChange', () => {
    jest.spyOn(AppContext, 'useStoreContext').mockImplementation(() => mockContext);
    const register = shallow(<Register />);
    expect(register.find('input').at(0).prop('value')).toEqual('');
    register.find('input').at(0).simulate('change', { target: { value: 'email@email' } });
    expect(register.find('input').at(0).prop('value')).toEqual('email@email');
  });

  it('Name input onChange', () => {
    jest.spyOn(AppContext, 'useStoreContext').mockImplementation(() => mockContext);
    const register = shallow(<Register />);
    expect(register.find('input').at(1).prop('value')).toEqual('');
    register.find('input').at(1).simulate('change', { target: { value: 'name' } });
    expect(register.find('input').at(1).prop('value')).toEqual('name');
  });

  it('Password input onChange', () => {
    jest.spyOn(AppContext, 'useStoreContext').mockImplementation(() => mockContext);
    const register = shallow(<Register />);
    expect(register.find('input').at(2).prop('value')).toEqual('');
    register.find('input').at(2).simulate('change', { target: { value: 'password' } });
    expect(register.find('input').at(2).prop('value')).toEqual('password');
  });

  // Check labels
  it('Email input has a label', () => {
    jest.spyOn(AppContext, 'useStoreContext').mockImplementation(() => mockContext);
    const register = shallow(<Register />);
    expect(register.find('label').at(0).prop('htmlFor')).toEqual(register.find('input').at(0).prop('id'));
  });

  it('Name input has a label', () => {
    jest.spyOn(AppContext, 'useStoreContext').mockImplementation(() => mockContext);
    const register = shallow(<Register />);
    expect(register.find('label').at(1).prop('htmlFor')).toEqual(register.find('input').at(1).prop('id'));
  });

  it('Password input has a label', () => {
    jest.spyOn(AppContext, 'useStoreContext').mockImplementation(() => mockContext);
    const register = shallow(<Register />);
    expect(register.find('label').at(2).prop('htmlFor')).toEqual(register.find('input').at(2).prop('id'));
  });

  it('Form submit', () => {
    const mock = jest.fn();
    const registerForm = shallow(
      <Form onSubmit={mock} />,
    );
    registerForm.simulate('submit');
    expect(mock).toBeCalledTimes(1);
  });
});

function createDummyCard(dummyjson) {
  return <QuestionCard json={dummyjson} />;
}

describe('Question Card', () => {
  const dummyQuestion = {
    type: 'Single Choice',
    name: 'Question 2',
    duration: 10,
    points: 1000,
    videolink: null,
    questionId: 1,
  };

  it('Uses json props name', () => {
    const questionCard = shallow(createDummyCard(dummyQuestion));
    expect(questionCard.find(Card.Header).props().content).toEqual(dummyQuestion.name);
  });

  it('Uses json props type', () => {
    const questionCard = shallow(createDummyCard(dummyQuestion));
    expect(questionCard.find(Card.Meta).at(0).props().content).toEqual(dummyQuestion.type);
  });

  it('Uses json props points', () => {
    const questionCard = shallow(createDummyCard(dummyQuestion));
    expect(questionCard.find(Card.Meta).at(1).props().content).toEqual(`${dummyQuestion.points} points`);
  });

  it('CardButton onclick', () => {
    const mock = jest.fn();
    const cardButton = shallow(<CardButton onClick={mock}>Delete Question</CardButton>);
    cardButton.simulate('click');
    expect(mock).toBeCalledTimes(1);
  });
});
