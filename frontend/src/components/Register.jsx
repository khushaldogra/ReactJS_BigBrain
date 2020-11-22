import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import config from '../config';
import {
  RegisterBody, RegisterSegment, RegisterButton, RegisterTitle,
} from '../styledComponents/Register';
import { useStoreContext } from '../store';

function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const context = useStoreContext();
  // eslint-disable-next-line
  const [loggedIn, setIsLoggedIn] = context.loggedIn;

  const history = useHistory();

  // Register fetch
  const register = () => {
    if (!email || !name || !password) {
      alert('Please enter all fields');
      return;
    }
    const payload = {
      email,
      password,
      name,
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };
    const path = `${config.basePath}/admin/auth/register`;
    fetch(path, options)
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((json) => {
        localStorage.setItem('token', json.token);
        setIsLoggedIn(true);
        history.push('/dashboard');
      })
      .catch((err) => {
        err.json()
          .then((json) => {
            alert(json.error);
          });
      });
  };

  return (
    <RegisterBody>
      <RegisterSegment>
        <RegisterTitle>Register</RegisterTitle>
        <Form onSubmit={register}>
          <Form.Field>
            <label htmlFor="register-email">
              Email
              <input name="email" id="register-email" type="email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value); }} />
            </label>
          </Form.Field>
          <Form.Field>
            <label htmlFor="register-name">
              Name
              <input name="name" id="register-name" type="text" placeholder="Name" value={name} onChange={(e) => { setName(e.target.value); }} />
            </label>
          </Form.Field>
          <Form.Field>
            <label htmlFor="register-password">
              Password
              <input name="password" id="register-password" type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value); }} />
            </label>
          </Form.Field>
          <RegisterButton type="submit">Sign Up</RegisterButton>
        </Form>
      </RegisterSegment>
    </RegisterBody>
  );
}

export default Register;
