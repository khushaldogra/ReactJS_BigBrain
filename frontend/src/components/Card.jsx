import React, { useEffect, useState } from 'react'
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import config from '../config';
import { useHistory, Link } from 'react-router-dom';

const CardTemplate = (props) => {
  const history = useHistory()
  const { user_info } = props
  const [question, setQuestion] = useState(0)
  const [totaltime, setTotaltime] = useState(0)

  useEffect(() => {
    fetch(config.basePath+'/admin/quiz/'+user_info.id, {
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
    })
  },[])

  const deleteQuiz = () => {
    fetch(config.basePath+'/admin/quiz/'+user_info.id, {
      method: 'delete',
      headers: {
        'Authorization' : 'Bearer ' + localStorage['token'] 
      }
    })
    .then(res => {
      if (res.status === 200) {
          return res.json()
      } else{
          throw Error; 
      }
    })
    .then(quiz=>{
        history.go(0)
    })
    .catch (err => {
        alert(err.message)
    })
  }


  // get all quizes api - component - state-data - click button - api - add new quiz - added to database - response? (id) - state-data(push resposne) - u cant see card information 
  return(
    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src={user_info.thumbnail}
          // x icon on card ********
          // label={{ as: 'a', color: 'red', corner: 'right', icon: 'close' }}
        />
        <Card.Header>Title: {user_info.name}</Card.Header>
        <Card.Meta>Number of questions: {question}</Card.Meta>
        <Card.Description>
          Total time to complete: {totaltime}
        </Card.Description>
        <br/>
        <Button icon='pencil alternate' onClick={() => history.push(`/card/edit/${user_info.id}`)} />
        <Button compact color="red" floated="right" onClick={deleteQuiz}>Delete</Button>
      </Card.Content>
    </Card>
)
}

CardTemplate.propTypes = {
  user_info : PropTypes.object.isRequired
}
export default CardTemplate