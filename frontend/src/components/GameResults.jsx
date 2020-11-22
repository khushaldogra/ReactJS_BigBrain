import React, { useState, useEffect } from 'react';
import {
  BarChart, Tooltip, Legend, Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer,
} from 'recharts';
import { useParams } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import config from '../config';
import { GameResultsBody, ChartsSection, ChartBox } from '../styledComponents/GameResults';

function GameResults() {
  const sessionID = useParams().id;
  const [userScores, setUserScores] = useState([]);
  const [questionCorrect, setQuestionCorrect] = useState([]);
  const [questionTime, setQuestionTime] = useState([]);

  // Get list of users and their scores
  const getUserScores = (jsonResults) => {
    const userScoresDic = {};
    jsonResults.forEach((player) => {
      let correctCount = 0;
      player.answers.forEach((answer) => {
        if (answer.correct) {
          correctCount += 1;
        }
      });
      userScoresDic[player.name] = correctCount;
    });
    const newUserScores = [];
    Object.entries(userScoresDic).forEach(([name, score]) => {
      newUserScores.push({
        name,
        score,
      });
    });
    newUserScores.sort((a, b) => parseInt(b.score, 10) - parseInt(a.score, 10));
    setUserScores(newUserScores);
  };

  // Get list of questions and how many correct
  const getQuestionCorrect = (jsonResults) => {
    const questionCorrectDic = {};
    jsonResults.forEach((player) => {
      let questionNo = 1;
      player.answers.forEach((answer) => {
        if (!(questionNo in questionCorrectDic)) {
          questionCorrectDic[questionNo] = 0;
        }
        // If correct answer
        if (answer.correct) {
          questionCorrectDic[questionNo] += 1;
        }
        questionNo += 1;
      });
    });
    const newQuestionCorrect = [];
    Object.entries(questionCorrectDic).forEach(([question, correct]) => {
      newQuestionCorrect.push({
        name: `Question ${question}`,
        question,
        correct: (correct / jsonResults.length) * 100,
      });
    });
    newQuestionCorrect.sort((a, b) => parseInt(a.question, 10) - parseInt(b.question, 10));
    setQuestionCorrect(newQuestionCorrect);
  };

  // Get list of questions and time spent on it
  const getQuestionTime = (jsonResults) => {
    const questionTimeDic = {};
    jsonResults.forEach((player) => {
      let questionNo = 1;
      player.answers.forEach((answer) => {
        const timeSpent = (Date.parse(answer.answeredAt)
                          - Date.parse(answer.questionStartedAt)) / 1000;
        // eslint-disable-next-line no-restricted-globals
        if (isNaN(timeSpent)) {
          questionNo += 1;
          return;
        }
        if (!(questionNo in questionTimeDic)) {
          questionTimeDic[questionNo] = timeSpent;
        } else {
          questionTimeDic[questionNo] += timeSpent;
        }
        questionNo += 1;
      });
    });
    const newQuestionTime = [];
    Object.entries(questionTimeDic).forEach(([question, time]) => {
      newQuestionTime.push({
        name: `Question ${question}`,
        question,
        time: time / jsonResults.length,
      });
    });
    newQuestionTime.sort((a, b) => parseInt(a.question, 10) - parseInt(b.question, 10));
    setQuestionTime(newQuestionTime);
  };

  // Fetch session results
  useEffect(() => {
    const token = localStorage.getItem('token');
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const path = `${config.basePath}/admin/session/${sessionID}/results`;
    fetch(path, options)
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((json) => {
        // Get data lists
        getUserScores(json.results);
        getQuestionCorrect(json.results);
        getQuestionTime(json.results);
      })
      .catch((err) => {
        err.json()
          .then((json) => {
            alert(json.error);
          });
      });
  }, [sessionID]);

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
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={questionCorrect}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'Percentage', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar name="Correct Percentage" dataKey="correct" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
        <ChartBox>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart width={600} height={300} data={questionTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'Seconds', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar name="Average Time" dataKey="time" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
      </ChartsSection>

    </GameResultsBody>
  );
}

export default GameResults;
