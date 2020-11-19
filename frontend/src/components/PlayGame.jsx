import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
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
import PropTypes from 'prop-types';
import config from '../config';

const PlayGamepage = ({id, sessionId}) => {
    const playerId = useParams().playerId;
    const history = useHistory()

    const [currentQn, setCurrentQn] = useState({
      answers:[]
    })
    const [nextQn, setNextQn] = useState(false)
    const [timerStop, setTimerStop] = useState(false)
    const [correctAns, setCorrectAns] = useState([])
    const [submittedAns, setSubmittedAns] = useState("")

    const nextQuestion = () => {
      if(nextQn){
      fetch(config.basePath + '/admin/quiz/' + id + '/advance', {
        method : 'post',
        headers : {
            'Authorization' : 'Bearer ' + localStorage['token'],
            'Content-Type' : 'Application/json'
        },
      })
      .then(res => {
        return res.json()
      })
      .then(res => {
        console.log(res)
        if(res.error){
          alert('game complete')
        }else{
          history.go(0)
        }
      })
    }
    }
    
    // submit api here ***
    const submitAnswer = () => {
      //API to submit answer
      setSubmittedAns("something")
      // fetch(config.basePath + '/play/' + playerId + '/answer', {
      //   method : 'get',
      //   headers : {
      //       'Content-Type' : 'Application/json'
      //   },
      // })
      // .then(res => {
      //   return res.json()
      // })
      // .then(data => {
      //   console.log(data)
      //   if(!data.error){
      //     setCorrectAns(data)
      //     setSubmittedAns("something")
      //     setNextQn(true)
      //   }else{
      //     alert('timer not complete, cannot submit')
      //   }
      // })
    }
    useEffect(() => {
      fetch(config.basePath + '/play/' + playerId + '/question', {
        method : 'get',
        headers : {
            'Content-Type' : 'Application/json'
        },
      })
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log(data)
        setCurrentQn(data.question)
      })
    }, [])

    useEffect(() => {
      fetch(config.basePath + '/play/' + playerId + '/answer', {
        method : 'get',
        headers : {
            'Content-Type' : 'Application/json'
        },
      })
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log(data)
        if(!data.error){
          setCorrectAns(data)
          setNextQn(true)
        }
      })
    },[])

  return (
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
        // questions here ***

        content={currentQn.name}
        style={{
        fontSize: '1.7em',
        fontWeight: 'normal',
        marginTop: '1.5em',
        }}
      />

      {currentQn.answers.map((answer,index) => (
        <Header
          as='h2'
          key={index}
          // Answer here ***

          content={answer.title}
          style={{
          fontSize: '1.7em',
          fontWeight: 'normal',
          marginTop: '1.5em',
          }}
        />
      ))}
      
    <Button content={"Submit Answer"} onClick={submitAnswer}/>
    <Button content={"Advance"} onClick={nextQuestion}/>
    </Container>
    )
  }


const PlayGame = () => {
  const { id, sessionId } = useParams()
  return (
    <Visibility
      once={false}
    >
      <Segment
        textAlign='center'
        style={{ minHeight: 700, padding: '1em 0em' }}
        id='playgame-component'
        vertical
      >
        <PlayGamepage id={id} sessionId={sessionId} />
      </Segment>
    </Visibility>
  )
}

export default PlayGame;

PlayGamepage.propTypes = {
  sessionId: PropTypes.string,
  id: PropTypes.string
}


/// currentIndex (state)
//  of questions question 1  --- next

// every input from user is state


// return {
//     'type': 'Empty Type',
//     'question': 'Empty Question',
//     'time': 0,
//     'points': 0,
//     'URL': null,
//     'answers': ['', '', '', '', '', ''],
//     'correctAnswers': [false, false, false, false, false, false],
//     'questionID': id
//   }

///start, join, advance position 0

//get qn - timer starts
//timer status?
//qn status?
//when timer complete
//get qn what happens?
//get answer
//quiz advance
//get next qn
