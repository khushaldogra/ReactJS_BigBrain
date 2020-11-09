import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import CardTemplate from './Card'
import config from '../config'
import { Button, Card, Image, Header, Modal } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react'
import Navigation from './Navigation';


const Dashboard = () => {
    const history = useHistory()
    const location = useLocation()
    const [quizzes, setQuizzes] = useState([])
    const [quizname, setQuizname] = useState("")
    const [open, setOpen] = useState(false)
    const [quizActive, setQuizActive] = useState("")

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
                setQuizzes(data["quizzes"])
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

    // routing props - send session id not through url
    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.host+'/game/'+quizActive)
        setOpen(false)
        alert('link copied')
    }

    return (
        <div>
            <span>Dashboard</span>
            {/* Display cards */}
            <Card.Group>
                {quizzes.map((quiz, index) => (
                    <CardTemplate key={index} quiz_info={quiz} setOpen={setOpen} setQuizActive={setQuizActive}></CardTemplate>
                ))}
            </Card.Group>
            <br/>
            {/* Is action necessary? *** */}
            <Input type='text' placeholder='Enter name of new quiz' action onChange={(e,{value}) => setQuizname(value)}>
                <input />
                <Button type='submit' onClick={addQuiz}>New Quiz</Button>
            </Input>
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                >
                <Modal.Header>Select a Photo</Modal.Header>
                <Modal.Content>
                    Session ID: {quizActive}
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => setOpen(false)}>
                        Close
                    </Button>
                    <Button
                    content="Copy Link"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={handleCopyLink}
                    positive
                    />
                </Modal.Actions>
            </Modal>
        </div>
    )
}

export default Dashboard;

// landing page - login - dashboard - pages