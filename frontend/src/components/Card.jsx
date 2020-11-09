import React, { useEffect, useState } from 'react'
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import config from '../config';
import { useHistory, Link } from 'react-router-dom';

const CardTemplate = (props) => {
  const history = useHistory()
  const { quiz_info, setOpen, setQuizActive } = props
  const [question, setQuestion] = useState(0)
  const [totaltime, setTotaltime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    fetch(config.basePath+'/admin/quiz/'+quiz_info.id, {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + localStorage['token'],
        'Content-type': 'application/json'
      }
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      if(data.questions) {
        setQuestion(data.questions.length)
        let time = 0
        data.questions.forEach(question => {
          time += question.time
        });
        setTotaltime(time)
      }  
      //fetch to check status of quiz
    })
  },[])

  const deleteQuiz = () => {
    fetch(config.basePath + '/admin/quiz/'+quiz_info.id, {
      method: 'delete',
      headers: {
        'Authorization' : 'Bearer ' + localStorage['token'] 
      }
    })
    .then(res => {
      if (res.status === 200) {
          return res.json()
      } else {
          throw Error; 
      }
    })
    .then(quiz=>{
        history.go(0)
    })
    .catch(err => {
        alert(err.message)
    })
  }

  const startQuiz = () => {
    // After starting, call the GET for the quizid to get the sesion ID.

    // call start quiz
    fetch(config.basePath + '/admin/quiz/' + quiz_info.id + '/start', {
      method: 'post',
      headers: {
        'Authorization' : 'Bearer ' + localStorage['token']
      }
    })
    .then(res => {
      return res.json()
    })
    .then(data => {
      if (data.error) {
        throw Error(data.error)
      }
      // call GET for quizId to get session ID
      fetch(config.basePath + '/admin/quiz/' + quiz_info.id, {
        method: 'get',
        headers: {
          'Authorization' : 'Bearer ' + localStorage['token']
        }
      })
      // handle other errors - 500, 404 ***
      .then(res => {
        return res.json()
      })
      .then(quiz => {
        if (quiz.error) {
          throw Error(quiz.error)
        }
        setIsPlaying(true)
        setQuizActive(quiz.active)
        setOpen(true)
      })
      .catch(err => {
        alert(err.message)
      })
    })
    .catch(err => {
      alert(err.message)
    })
  }

  const stopQuiz = () => {
      // fetch - stop quiz
      setIsPlaying(false) // this after successful api call
 
  }

  // get all quizes api - component - state-data - click button - api - add new quiz - added to database - response? (id) - state-data(push resposne) - u cant see card information 
  return(
    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src={quiz_info.thumbnail}
          // x icon on card ********
          // label={{ as: 'a', color: 'red', corner: 'right', icon: 'close' }}
        />
        <Card.Header>Title: {quiz_info.name}</Card.Header>
        <Card.Meta>Number of questions: {question}</Card.Meta>
        <Card.Description>
          Total time to complete: {totaltime}
        </Card.Description>
        <br/>
        <Button icon='pencil alternate' size='small' onClick={() => history.push(`/game/edit/${quiz_info.id}`)} />
         {/*Padding left style ***  */}
         {isPlaying?
         
        <Button icon='pause' color='red' size='small' onClick={stopQuiz} />
        :
        <Button className='startButton' icon='play' color='green' size='small' onClick={startQuiz} />
         }
        <Button compact color="red" floated="right" onClick={deleteQuiz}>Delete</Button>
      </Card.Content>
    </Card>
)
}

CardTemplate.propTypes = {
  quiz_info : PropTypes.object.isRequired,
  setOpen : PropTypes.func,
  setQuizActive : PropTypes.func
}
export default CardTemplate