import React from 'react';
// import { Button } from 'semantic-ui-react';
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
    Input
  } from 'semantic-ui-react'
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';


const HomepageHeading = ({ code }) => (
    <Container text color='red'>
      <Header
        as='h1'
        content='BigBrain Game'

        style={{
          fontSize: '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: '3em',
        }}
      />
      <Header
        as='h2'
        content='Enter code!'

        style={{
          fontSize: '1.7em',
          fontWeight: 'normal',
          marginTop: '1.5em',
        }}
      />
      <Input focus value={code} />
      <Button primary size='big'> 
        Play
      </Button>
      {/* <Button primary size='huge'>
        Get Started
        <Icon name='right arrow' />
      </Button> */}
    </Container>
  )

const Game = () => {
    const history = useHistory();
    const { id } = useParams();
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
            <HomepageHeading code={id}/>
          </Segment>
        </Visibility>
    )
}

HomepageHeading.propTypes = {
    code : PropTypes.object
}

export default Game;