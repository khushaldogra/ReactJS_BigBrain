import React, { useState, useEffect } from 'react';
import { BarChart, Tooltip, Legend, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useParams } from 'react-router-dom';
import { Table } from 'semantic-ui-react'
import config from '../config'

function GameResults() {
  const sessionID = useParams().id;
  const [results, setResults] = useState([]);
  // const [totalPlayers, setTotalPlayers] = useState(0);
  const [userScores, setUserScores] = useState([]);
  const [questionCorrect, setQuestionCorrect] = useState([]);
  const [questionTime, setQuestionTime] = useState([]);

  // Fetch session results
  useEffect(() => {
    const token = localStorage.getItem('token');
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    const path = `${config.basePath}/admin/session/${sessionID}/results`;
    fetch(path, options)
      .then(res => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then(json => {
        console.log(json);
        // Set total players
        // setTotalPlayers(json.results.length);
        // Set results
        setResults(json.results);
        // Get data lists
        getUserScores(json.results);
        getQuestionCorrect(json.results);
        getQuestionTime(json.results);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  const getUserScores = (jsonResults) => {
    let userScoresDic = {};
    for (const player of jsonResults) {
      // Go through all the answers and count correct
      let correctCount = 0;
      for (const answer of player.answers) {
        if (answer.correct) {
          correctCount++;
        }
      }
      // Put user in dictionary with number of correct answers
      userScoresDic[player.name] = correctCount;
    }
    let newUserScores = [];
    for (const [name, score] of Object.entries(userScoresDic)) {
      newUserScores.push({
        'name': name,
        'score': score
      })
    }
    newUserScores.sort((a, b) => { return parseInt(a.score) - parseInt(b.score) });
    // console.log(newUserScores);
    setUserScores(newUserScores);
  }

  const getQuestionCorrect = (jsonResults) => {
    let questionCorrectDic = {};
    for (const player of jsonResults) {
      let questionNo = 1;
      for (const answer of player.answers) {
        if (!(questionNo in questionCorrectDic)) {
          questionCorrectDic[questionNo] = 0;
        }
        // If correct answer
        if (answer.correct) {
          questionCorrectDic[questionNo] += 1;
        }
        questionNo++;
      }
    }
    let newQuestionCorrect = [];
    for (const [question, correct] of Object.entries(questionCorrectDic)) {
      newQuestionCorrect.push({
        'question': question,
        'correct': correct/jsonResults.length
      })
    }
    newQuestionCorrect.sort((a, b) => { return parseInt(a.question) - parseInt(b.question) });
    setQuestionCorrect(newQuestionCorrect);
  }

  const getQuestionTime = (jsonResults) => {
    let questionTimeDic = {};
    for (const player of jsonResults) {
      let questionNo = 1;
      for (const answer of player.answers) {
        const timeSpent = Date.parse(answer.answeredAt) - Date.parse(answer.questionStartedAt);
        if (!(questionNo in questionTimeDic)) {
          questionTimeDic[questionNo] = timeSpent;
        } else {
          questionTimeDic[questionNo] += timeSpent;
        }
        questionNo++;
      }
    }
    let newQuestionTime = [];
    for (const [question, time] of Object.entries(questionTimeDic)) {
      newQuestionTime.push({
        'question': question,
        'time': time/jsonResults.length
      })
    }
    newQuestionTime.sort((a, b) => { return parseInt(a.question) - parseInt(b.question) });
    setQuestionTime(newQuestionTime);
  }

  const data = [
    {
      "name": "Page A",
      "uv": 4000,
    },
    {
      "name": "Page B",
      "uv": 3000,
    },
    {
      "name": "Page C",
      "uv": 2000,
    },
    {
      "name": "Page D",
      "uv": 2780,
    },
    {
      "name": "Page E",
      "uv": 1890,
    },
    {
      "name": "Page F",
      "uv": 2390,
    },
    {
      "name": "Page G",
      "uv": 3490,
    }
  ]
  return (
    <>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Players</Table.HeaderCell>
            <Table.HeaderCell>Score</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {userScores.slice(0, 5).map((user) => (
            <Table.Row key={user.name}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.score}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {console.log(questionCorrect)}
      {console.log(questionTime)}
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </>
  )
}

export default GameResults;