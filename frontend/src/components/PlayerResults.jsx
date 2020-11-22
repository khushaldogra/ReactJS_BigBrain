import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import config from '../config';
import {
  PlayerResultsBody, ResultsCard, ResultTitle, ResultInfo,
} from '../styledComponents/PlayerResults';

function QuestionResult({ json, idx }) {
  const timeSpent = (Date.parse(json.answeredAt) - Date.parse(json.questionStartedAt)) / 1000;
  const color = json.correct === true ? 'green' : 'red';
  return (
    <ResultsCard color={color}>
      <ResultTitle correct={json.correct}>
        Question
        {idx + 1}
        :
        {json.correct === true ? 'Correct' : 'Wrong'}
      </ResultTitle>
      <ResultInfo>
        Time Spent:
        {timeSpent.toFixed(1)}
        {' '}
        seconds
      </ResultInfo>
      <ResultInfo>
        Correct Answers:
        {json.answerIds.join(', ')}
      </ResultInfo>
    </ResultsCard>
  );
}

function PlayerResults() {
  const { playerId } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
    };
    const path = `${config.basePath}/play/${playerId}/results`;
    fetch(path, options)
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((json) => {
        setResults(json);
      })
      .catch((err) => {
        err.json()
          .then((json) => {
            alert(json.error);
          });
      });
  }, [playerId]);

  return (
    <PlayerResultsBody>
      {results.map((resultJson, idx) => (
        <QuestionResult
          key={resultJson.answeredAt}
          json={resultJson}
          idx={idx}
        />
      ))}
    </PlayerResultsBody>
  );
}

QuestionResult.propTypes = {
  json: PropTypes.shape({
    answerIds: PropTypes.instanceOf(Array),
    correct: PropTypes.bool,
    answeredAt: PropTypes.string,
    questionStartedAt: PropTypes.string,
  }).isRequired,
  idx: PropTypes.number.isRequired,
};

export default PlayerResults;
