import React,{useState} from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import config from '../config'

const Login = () => {
    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handlerOnsubmit = () => {
        // fetch - body
        fetch(config.basePath+'/admin/auth/login', {
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
            // *****
            localStorage.setItem("token", data['token'])
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