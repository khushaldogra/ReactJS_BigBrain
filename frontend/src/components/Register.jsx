import React, { useState, useContext } from 'react';
import { Form } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom';
import config from '../config';
import { RegisterBody, RegisterSegment, RegisterButton, RegisterTitle } from '../styledComponents/Register';
import { StoreContext } from '../store';

function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const context = useContext(StoreContext);
  const [loggedIn, setIsLoggedIn] = context.loggedIn;

  const history = useHistory();
  
  // Register fetch
  const register = () => {
    if (!email || !name || !password) {
      alert("Please enter all fields");
      return;
    }
    const payload = {
      'email': email,
      'password': password,
      'name': name
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
    const path = `${config.basePath}/admin/auth/register`;
    fetch(path, options)
      .then(res => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then(json => {
        localStorage.setItem("token", json.token);
        setIsLoggedIn(true);
        history.push('/dashboard');
      })
      .catch(err => {
        err.json()
          .then(json => {
            alert(json.error);
          });
      })
  }

  return (
    <RegisterBody>
      <RegisterSegment>
        <RegisterTitle>Register</RegisterTitle>
        <Form onSubmit={register}>
          <Form.Field>
            <label htmlFor='register-email'>Email</label>
            <input id='register-email' type='email' placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
          </Form.Field>
          <Form.Field>
            <label htmlFor='register-name'>Name</label>
            <input id='register-name' type='text' placeholder='Name' value={name} onChange={(e) => { setName(e.target.value) }} />
          </Form.Field>
          <Form.Field>
            <label htmlFor='register-password'>Password</label>
            <input id='register-password' type='password' placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
          </Form.Field>
          <RegisterButton type='submit'>Sign Up</RegisterButton>
        </Form>
      </RegisterSegment>
    </RegisterBody>
  )
}

export default Register;