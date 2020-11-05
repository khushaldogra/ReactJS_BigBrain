import React,{useState} from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

// const api = new API('http://localhost:5005');

const Login = () => {
    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handlerOnsubmit = () => {
        // login api - use axios ?
        // fetch - body
        console.log(email)
        console.log(password)
        fetch('http://localhost:5005/admin/auth/login', {
            method:'post',
            body: JSON.stringify({
                'email' : email,
                'password' : password,
            }), 
            headers: {
                'Content-Type' : 'application/json',
            },

        })
        .then(res=> {
          // if(res.status !== 200) 
          return res.json()
        })
        .then(data => {
            if (data.error) {
              throw Error(data.error);
            }
            history.push('/home')
        })
        .catch(err => {
          alert(err.message)
        })
    }

    return(
        <div>
      <Header as='h2' color='teal' textAlign='center'>
        Log-in to your account
      </Header>
      <Form size='large' onSubmit={handlerOnsubmit}>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' onChange={(e,{value})=>setEmail(value)} />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            onChange={(e, {value})=>setPassword(value)}
          />

          <Button color='teal' fluid size='large'>
            Login
          </Button>
        </Segment>
      </Form>
          
        </div>
    )
}
export default Login;