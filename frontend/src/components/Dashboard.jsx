import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import CardTemplate from './Card'
import config from '../config'
import { Button, Card, Image } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'


const Dashboard = () => {
    const history = useHistory()
    const location = useLocation()
    const [data, setData] = useState([])
    const [quizname, setQuizname] = useState("")

    // stop logged out user from accessing Dashboard
    useEffect(() => {
        if (!localStorage["token"]) {
            // alert("Invalid token")
            history.push('/')
        }
    }, [location])
    useEffect(() => {
        // extract data of all games - fetch
        fetch(config.basePath + '/admin/quiz', {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + localStorage['token'],
                'Content-Type': 'application/json'
            },
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                if (data.error) {
                    throw Error(data.error);
                }
                console.log(data)
                // console.log(data["quizzes"][0])
                // quizzes = data['quizzes'].map((p,i) => renderCards(p,i))
                setData(data["quizzes"])
            })
            .catch(err => {
                alert(err.message)
            })
    }, [])
    // React lifecycle - component did mount, component did update, component will mount - class components
    // useeffect - functional components
    // dashboard of all games is displayed - display cards
    const addQuiz = () => {
        fetch(config.basePath + '/admin/quiz/new', {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + localStorage['token'],
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': quizname
            })
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    throw Error;
                }
            })
            .then(quiz => {
                history.go(0)
            })
            .catch(err => {
                alert(err.message)
            })
    }
    return (
        <div>
            <span>Dashboard</span>
            {/* Display cards */}
            <Card.Group>
                {data.map((id, index) => (
                    <CardTemplate key={index} user_info={id}></CardTemplate>
                ))}
            </Card.Group>
            <br />
            <Input type='text' placeholder='Enter name of new quiz' action onChange={(e, { value }) => setQuizname(value)}>
                <input />
                <Button type='submit' onClick={addQuiz}>New Quiz</Button>
            </Input>
            <br />
            <br />
            <Input type='text' placeholder='Enter quiz to delete'>
                <input />
                <Button type='submit'>Delete Quiz</Button>
            </Input>
        </div>
    )
}

export default Dashboard;

// landing page - login - dashboard - pages