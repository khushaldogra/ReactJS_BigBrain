import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react'
import { useParams } from 'react-router-dom';
import config from '../config'

function Edit() {
    const { id } = useParams();
    let quizName = '';
    let questions = [];
    let thumbnail = null;

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
        const path = `${config.basePath}/admin/quiz/${id}`;
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
                questions = json.questions;
                console.log(json);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const addQuestion = () => {
        const payload = {
            'questions': {},
            'name': quizName,
            'thumbnail': thumbnail
        }
    }

    return (
        <div>
            <Button onClick={addQuestion}>Add Question</Button>
        </div>
    )
}

export default Edit;