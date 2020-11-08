import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'semantic-ui-react'

function QuestionCard(props) {
    const json = props.json;
    console.log(props.json);

    const deleteQuestion = () => {
        // const token = localStorage.getItem('token');
        // const payload = {
        //     'questions': [... questions, emptyQuestion()],
        //     'name': quizName,
        //     'thumbnail': thumbnail
        // }
        console.log('delete');
    }

    return (
        <Card>
            <Card.Content>
                <Card.Header content={json.question} />
                <Card.Meta content='Musicians' />
                <Card.Description content='Jake is a drummer living in New York.' />
                <Button onClick={deleteQuestion}>Delete Question</Button>
            </Card.Content>
        </Card>
    )
}

QuestionCard.propTypes = {
  json : PropTypes.any
}

export default QuestionCard;