import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { GameButton } from '../styledComponents/PlayGame';
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
    const [correctAnsIds, setCorrectAnsIds] = useState([])
    const [error, setError] = useState("")
    const [answeridArray, setAnsweridArray] = useState([])
    const [isAnswerSubmitted, setIsANswerSubmitted] = useState(false)
    const [activequiz, setActivequiz] = useState(false)
    
    // submit api here 
    const submitAnswer = ( index ) => { 
      let tempArray = [...answeridArray]
      if(answeridArray.includes(index)){
        //Remove value from answer id array
        tempArray = tempArray.filter(id => id!==index)
        setAnsweridArray(tempArray)
        // document.getElementById(index).style.background = "#E0E1E2";
      }else{
        //Add value to answer id array
        tempArray.push(index)
        setAnsweridArray(tempArray)
        // document.getElementById(index).style.background = "#37E6FE";
      }
      console.log(tempArray)
      fetch(config.basePath + '/play/' + playerId + '/answer', {
        method : 'put',
        headers : {
            'Content-Type' : 'Application/json'
        },
        body: JSON.stringify({
          "answerIds": tempArray
        }),
      })
      .then(res => {
        return res.json()
      })
      .then(res => {
        console.log(res)
        if(!res.error){
          setIsANswerSubmitted(true)
      }else{
        console.log(res.error)
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
          setActivequiz(true)
          setError("")
          // insufficient resources error ***
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
              // console.log(data)
              setCurrentQn(data.question)
              const timeLeftNew = data.question.duration - (new Date() - new Date(data.question.isoTimeLastQuestionStarted))/1000
            
              if (timeLeftNew <= 0) {
                setTimeLeft(0)
                setAnsweridArray([])
                setQuizstart(quizstart + 1)
              }
                //API to submit answer
                //API to fetch answer
            
            else {
              
              setQuizstart(0)
              setCorrectAns([])
              setCorrectAnsIds([])
              setTimeLeft(timeLeftNew)
            }
    
          }
          })
          .catch(err => {
            // fix error ***
            console.log(err)
          })
        }else{
          if(activequiz){
            history.push("/game/join")

          }
          setQuizstart(quizstart + 1)
          setTimeLeft(0)
          setError("Session Not Started")
        }
      })


    },[quizstart,timeLeft])

  useEffect(()=>{
    if(timeLeft == 0){
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
              let temp = []
              setCorrectAnsIds(data.answerIds)
              data.answerIds.forEach(ansId => {
                currentQn.answers.forEach(ans=>{
                  if(ans.answerId == ansId){
                    temp.push(ans)
                  }
                })
              })
              setCorrectAns(temp)
            } else{
              alert(data.error)
            }
          })
        }
  },[timeLeft])

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
        <GameButton className={"option "+(correctAnsIds.includes(answer.answerId)?"correctOption":(timeLeft==0?"incorrectOption":""))+(answeridArray.includes(answer.answerId)?"activeOption":"")} size='massive' key={index} onClick={() => submitAnswer(answer.answerId)}>{answer.title}</GameButton>
        
        // <Header
        //   as='h2's
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
      {timeLeft == 0?
      <div>Correct answers</div>
      :null}
      {correctAns.map((answer,index) => (
            <div key={index}>{answer.answerId} : {answer.title}</div>
      ))
      }
      
    <br />
    <br />
    {/* <Button content={"Submit Answer"} onClick={submitAnswer}/> */}
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