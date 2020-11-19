import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

const HomepageHeading = () => {
  const history = useHistory()

  const linkRegister = () => {
    history.push('/register')
  }

  return (
    <Container text color='red'>
      <Header
        as='h1'
        content='BigBrain'

        style={{
          fontSize: '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: '3em',
        }}
      />
      <Header
        as='h2'
        content='Make learning awesome!'

        style={{
          fontSize: '1.7em',
          fontWeight: 'normal',
          marginTop: '1.5em',
        }}
      />
      <Button primary size='huge' onClick={linkRegister}>
        Get Started
        <Icon name='right arrow' />
      </Button>
    </Container>
  )
}

const Landing = () => {
    const history = useHistory()
    
    const linkRegister = () => {
      history.push('/register')
    }
    const linkLogin = () => {
      history.push('/login')
    }

    return (
        <Visibility
          once={false}
        >
          <Segment
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em'}}
            id='home-component'
            vertical
          >
              {/* Move to css file */}
            <Button floated={"right"} style={{margin: "0 1% 0 0"}} onClick={linkRegister}>Register</Button>
            <Button floated={"right"} style={{margin: "0 1% 0 0"}} onClick={linkLogin}>Log in</Button>
            <HomepageHeading/>
          </Segment>
        </Visibility>
    )
}

export default Landing;