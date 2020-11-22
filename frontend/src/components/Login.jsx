import React, { useState } from 'react';
import {
  Button, Form, Header, Segment,
} from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import config from '../config';
import { useStoreContext } from '../store';

const Login = () => {
  const history = useHistory();
  const context = useStoreContext();
  // eslint-disable-next-line
  const [loggedIn, setIsLoggedIn] = context.loggedIn;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlerOnsubmit = () => {
    // fetch - body
    fetch(`${config.basePath}/admin/auth/login`, {
      method: 'post',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },

    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw Error(data.error);
        }
        // *****
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        history.push('/dashboard');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const linkLanding = () => {
    history.push('/');
  };

  return (
    <div>
      <Header as="h2" color="teal" textAlign="center">
        Log-in to your account
      </Header>
      <Form size="large" onSubmit={handlerOnsubmit}>
        <Segment stacked>
          <Form.Input fluid icon="user" iconPosition="left" placeholder="E-mail address" onChange={(e, { value }) => setEmail(value)} />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
            onChange={(e, { value }) => setPassword(value)}
          />

          <Button color="teal" fluid size="large">
            Login
          </Button>
        </Segment>
      </Form>
      <br />
      <Button onClick={linkLanding}>Return</Button>
    </div>
  );
};
export default Login;
