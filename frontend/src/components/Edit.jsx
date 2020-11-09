import React, { useEffect, useState } from 'react';
import { Button, Card } from 'semantic-ui-react'
import { useParams } from 'react-router-dom';
import config from '../config'
import QuestionCard from './QuestionCard';

function Edit() {
    const quizID = useParams().id;
    let quizName = ''; // useState?
    let thumbnail = null;
    const [questions, setQuestions] = useState([]);
    const [questionChange, setQuestionChange] = useState(true);

    // Fetch questions in quiz
    // Maybe an unecessary fetch
    useEffect(() => {
        const token = localStorage.getItem('token');
        // console.log(token);
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        const path = `${config.basePath}/admin/quiz/${quizID}`;
        fetch(path, options)
            .then(res => {
                if (!res.ok) {
                    throw res;
                }
                return res.json();
            })
            .then(json => {
                quizName = json.name;
                thumbnail = json.thumbnail;
                setQuestions(json.questions);
                console.log(json);
            })
            .catch(err => {
                console.log(err);
            })
    }, [questionChange]);

    // Create an empty question json template
    const emptyQuestion = (id) => {
        return {
            'type': 'Empty Type',
            'question': 'Empty Question',
            'time': 0,
            'points': 0,
            'URL': null,
            'answers': null,
            'correctAnswer': null,
            'questionID': id
        }
    }

    // Adds an empty question to the quiz
    const addQuestion = () => {
        const token = localStorage.getItem('token');
        const payload = {
            'questions': [...questions, emptyQuestion(questions.length + 1)],
            'name': quizName,
            'thumbnail': thumbnail
        }
        const options = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' // FORGOT THIS
            },
            body: JSON.stringify(payload)
        }
        const path = `${config.basePath}/admin/quiz/${quizID}`;
        fetch(path, options)
            .then(res => {
                if (!res.ok) {
                    throw res;
                }
                console.log('Good put');
                setQuestionChange(!questionChange);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <Button onClick={addQuestion}>Add Question</Button>
            <Card.Group>
                {questions.map((q) => (<QuestionCard key={q.questionID} json={q}/>))}
            </Card.Group>
        </div>
    )
}

export default Edit;