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
    const [quizstart, setQuizstart] = useState(0)
    const [timeLeft, setTimeLeft] = useState(0)
    const [correctAns, setCorrectAns] = useState([])
    const [submittedAns, setSubmittedAns] = useState("")
    const [error, setError] = useState("")
    
    // submit api here 
    const submitAnswer = () => {
      //API to submit answer
      setSubmittedAns("something")

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
          setSubmittedAns("something")
        } else{
          alert(data.error)
        }
      })
    }
    //component did update
    useEffect(() => {
      //api for active status
      fetch(config.basePath + '/play/' + playerId + '/status', {
        method : 'get',
        headers : {
            'Content-Type' : 'Application/json'
        },
      })
      .then(res => {
        return res.json()
      })
      .then(res => {
        if (res.started) {
          setError("")
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
            if (!data.error) {
              console.log(data)
              setCurrentQn(data.question)
              const timeLeftNew = data.question.duration - (new Date() - new Date(data.question.isoTimeLastQuestionStarted))/1000
            
              if (timeLeftNew <= 0) {
                setTimeLeft(0)
              } else {
                setTimeLeft(timeLeftNew)
              }
    
            }
          })
          .catch(err => {
            console.log(err)
          })
        }else{
          setQuizstart(quizstart + 1)
          setTimeLeft(0)
          setError("Session Not Started")
        }
      })


    })

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
      {error !== ""?
      <div>{error} Contact Admin and try reloading</div>:null}
      {currentQn?<div>
      <div>{parseInt(timeLeft)}</div>
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

      {currentQn.answers.map((answer,index) => 
        <Button key={index} size="massive" onClick={submitAnswer}>{answer.title}</Button>
        
        // <Header
        //   as='h2'
        //   key={index}
        //   // Answer here ***

        //   content={answer.title}
        //   style={{
        //   fontSize: '1.7em',
        //   fontWeight: 'normal',
        //   marginTop: '1.5em',
        //   }}
        // />
      )}
    <br />
    <br />
    <Button content={"Submit Answer"} onClick={submitAnswer}/>
    </div>
    :
    <div>Game not yet started</div>
    }
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


//Players - enter session id and join - get qn, get answer
//Admin  - has a session id - advance - get quiz info

//iso time started, get qn in infinite loop using useeffect
//qn duration
//duration - (currenttime-timestarted) = timeleft in min