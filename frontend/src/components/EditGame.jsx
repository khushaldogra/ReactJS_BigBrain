import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../config'

function Edit() {
    const { id } = useParams();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        const path = `${config.basePath}/admin/quiz/${id}`;
        // console.log(quizId);
        fetch(path, options)
            .then(res => {
                if (!res.ok) {
                    throw res;
                }
                return res.json();
            })
            .then(json => {
                console.log(json);
            })
            .catch(err => {
                console.log(err);
            })

    }, []);

    return (
        <div>
            <h1>tetst</h1>
        </div>
    )
}

export default Edit;