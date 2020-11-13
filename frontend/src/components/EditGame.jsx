import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../config'
import QuestionCard from './QuestionCard';
import { Button, Card } from 'semantic-ui-react'

function EditGame() {
    const quizID = useParams().id;
    const [quizName, setQuizName] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [questions, setQuestions] = useState([]);
    const [questionIDs, setQuestionIDs] = useState(new Set());
    const [questionChange, setQuestionChange] = useState(true);

    // Fetch questions in quiz
    // Maybe an unecessary fetch
    useEffect(() => {
        const token = localStorage.getItem('token');
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
                setQuizName(json.name);
                setThumbnail(json.thumbnail);
                setQuestions(json.questions);
                // Update the question id set
                let existingIDs = new Set();
                for (const q of json.questions) {
                    existingIDs.add(q.questionID);
                }
                setQuestionIDs(existingIDs);
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
            'answers': ['', '', '', '', '', ''],
            'correctAnswers': [false, false, false, false, false, false],
            'questionID': id
        }
    }

    // Return a unique question id
    const getQuestionID = () => {
        let n = 0;
        while (questionIDs.has(n)) {
            n++;
        }
        return n;
    }

    // Adds an empty question to the quiz
    const addQuestion = () => {
        const token = localStorage.getItem('token');
        const uniqueID = getQuestionID();
        const payload = {
            'questions': [...questions, emptyQuestion(uniqueID)],
            'name': quizName,
            'thumbnail': thumbnail
        }
        const options = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
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
                {questions.map((q) => (<QuestionCard 
                                        key={q.questionID} 
                                        json={q}
                                        questionChange={questionChange}
                                        setQuestionChange={setQuestionChange}
                                        questions={questions} // For fetch
                                        quizName={quizName} 
                                        thumbnail={thumbnail} />))}
            </Card.Group>
        </div>
    )
}

export default EditGame;