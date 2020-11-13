import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom';
import config from '../config'

function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory()
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
        localStorage.setItem("token", json.token)
        history.push('/dashboard')
      })
      .catch(err => {
        console.log(err);
      })
  }

  // Register form return
  return (
    <div>
      <Form onSubmit={register}>
        <Form.Input label='Email' type='email' placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
        <Form.Input label='Name' type='text' placeholder='Name' value={name} onChange={(e) => { setName(e.target.value) }} />
        <Form.Input label='password' type='password' placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
        <Button type='submit'>Submit</Button>
      </Form>
    </div>
  )
}

export default Register;