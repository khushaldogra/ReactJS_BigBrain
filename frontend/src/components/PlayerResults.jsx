import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import config from '../config';
import {
  PlayerResultsBody, ResultsCard, ResultTitle, ResultInfo, GameResultsButton,
} from '../styledComponents/PlayerResults';

function QuestionResult({ json, idx }) {
  const timeSpent = (Date.parse(json.answeredAt) - Date.parse(json.questionStartedAt)) / 1000;
  const color = json.correct === true ? 'green' : 'red';
  console.log(timeSpent);
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
  const { sessionId } = useParams();
  const history = useHistory();
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
        console.log(json);
        setResults(json);
      })
      .catch((err) => {
        err.json()
          .then((json) => {
            alert(json.error);
          });
      });
  }, []);

  const handler = () => {
    history.push(`/results/${sessionId}`);
  };

  return (
    <PlayerResultsBody>
      <GameResultsButton color="blue" onClick={handler}>View Game Results</GameResultsButton>
      {results.map((resultJson, idx) => (<QuestionResult key={idx} json={resultJson} idx={idx} />))}
    </PlayerResultsBody>
  );
}

QuestionResult.propTypes = {
  json: PropTypes.any,
  idx: PropTypes.number,
};

export default PlayerResults;
