import React, { useState, useEffect } from 'react';
import { BarChart, Tooltip, Legend, Bar, CartesianGrid, XAxis, YAxis, LineChart, Line } from 'recharts';
import { useParams } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import config from '../config';
import { GameResultsBody, ChartsSection, ChartBox } from '../styledComponents/GameResults';

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

  // Get list of users and their scores
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

  // Get list of questions and how many correct
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
        'name': `Question ${question}`,
        'question': question,
        'correct': correct / jsonResults.length
      })
    }
    newQuestionCorrect.sort((a, b) => { return parseInt(a.question) - parseInt(b.question) });
    setQuestionCorrect(newQuestionCorrect);
  }

  // Get list of questions and time spent on it
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
        'name': `Question ${question}`,
        'question': question,
        'time': time / jsonResults.length
      })
    }
    newQuestionTime.sort((a, b) => { return parseInt(a.question) - parseInt(b.question) });
    setQuestionTime(newQuestionTime);
  }

  // DUMMY DATA, FILL IN WITH ACTUAL DATA LATER
  const data = [
    {
      "name": "Question 1",
      "question": 1,
      "time": 100,
    },
    {
      "name": "Question 2",
      "question": 2,
      "time": 50,
    },
    {
      "name": "Question 3",
      "question": 3,
      "time": 70,
    },
    {
      "name": "Question 4",
      "question": 4,
      "time": 60,
    },
    {
      "name": "Question 5",
      "question": 5,
      "time": 70,
    },
    {
      "name": "Question 6",
      "question": 6,
      "time": 20,
    },
  ]

  const data2 = [
    {
      "name": "Question 1",
      "question": 1,
      "correct": 100,
    },
    {
      "name": "Question 2",
      "question": 2,
      "correct": 50,
    },
    {
      "name": "Question 3",
      "question": 3,
      "correct": 70,
    },
    {
      "name": "Question 4",
      "question": 4,
      "correct": 60,
    },
    {
      "name": "Question 5",
      "question": 5,
      "correct": 70,
    },
    {
      "name": "Question 6",
      "question": 6,
      "correct": 20,
    },
  ]

  return (
    <GameResultsBody>
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
      <ChartsSection>
        <ChartBox>
          <BarChart width={800} height={400} data={questionCorrect}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Percentage', angle: -90, position: 'insideLeft' }}/>
            <Tooltip />
            <Legend />
            <Bar name="Correct Percentage" dataKey="correct" fill="#82ca9d" />
          </BarChart>
        </ChartBox>
        <ChartBox>
          <BarChart width={800} height={400} data={questionTime}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Seconds', angle: -90, position: 'insideLeft' }}/>
            <Tooltip />
            <Legend />
            <Bar name="Average Time" dataKey="time" fill="#8884d8" />
          </BarChart>
        </ChartBox>

      </ChartsSection>

    </GameResultsBody>
  )
}

export default GameResults;