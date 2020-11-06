import React, { useEffect, useState } from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import config from '../config';
import { useHistory } from 'react-router-dom';

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



  // get all quizes api - component - state-data - click button - api - add new quiz - added to database - response? (id) - state-data(push resposne) - u cant see card information 
  return(
    <Card onClick={() => history.push('/card/'+user_info.id)}>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src={user_info.thumbnail}
        />
        <Card.Header>Title: {user_info.name}</Card.Header>
        <Card.Meta>Number of questions: {question}</Card.Meta>
        <Card.Description>
          Total time to complete: {totaltime}
        </Card.Description>
      </Card.Content>
    </Card>
)
}

CardTemplate.propTypes = {
  user_info : PropTypes.object.isRequired
}
export default CardTemplate