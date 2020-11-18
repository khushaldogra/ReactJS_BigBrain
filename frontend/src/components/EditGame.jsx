import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../config';
import QuestionCard from './QuestionCard';
import { Card } from 'semantic-ui-react';
import { AddQuestionButton, EditGameBody, QuestionBox, GameOptions,
         ImportLabel, GameDataDiv } from '../styledComponents/EditGame';
import { updateQuiz } from '../api';

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
          existingIDs.add(q.questionId);
        }
        setQuestionIDs(existingIDs);
        console.log(json);
      })
      .catch(err => {
        alert(err);
      })
  }, [questionChange]);

  // Create an empty question json template
  const emptyQuestion = (id) => {
    return {
      'type': 'Empty Type',
      'name': 'Empty Question',
      'duration': 0,
      'points': 0,
      'videolink': null,
      'answers': [
        {
          'answerId': 0,
          'correct': false,
          'title': '',
          'color': null
        },
        {
          'answerId': 1,
          'correct': false,
          'title': '',
          'color': null
        }
      ],
      'questionId': id
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
    const uniqueID = getQuestionID();
    const newQuestions = [...questions, emptyQuestion(uniqueID)];
    updateQuiz(newQuestions, quizName, thumbnail, quizID)
      .then(() => {
        setQuestionChange(!questionChange);
      })
      .catch(err => {
        alert(err);
      })
  }

  // Error checking for json
  const importJSONError = (json) => {
    if (json === undefined) {
      alert("Undefined JSON");
      return true;
    } else if (json.name === '') {
      alert("Empty quiz name");
      return true;
    }
    return false;
  }

  // Creates file reader to read json file input
  const handleFileChosen = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = (frEvent) => {
      const json = JSON.parse(frEvent.target.result);
      // Error checking
      if (importJSONError(json)) {
        return;
      }
      importFile(json);
    }
    fileReader.readAsText(e.target.files[0]);
    e.target.value = null;
  };

  // Perform the quiz update for file input
  const importFile = (file) => {
    updateQuiz(file.questions, file.name, file.thumbnail, quizID)
      .then(() => {
        setQuestionChange(!questionChange);
      })
      .catch(err => {
        alert(err);
      })
  }

  return (
    <EditGameBody>
      <GameOptions>
        <AddQuestionButton color='blue' onClick={addQuestion}>Add Question</AddQuestionButton>
        <p>OR</p>
        <GameDataDiv>
          <ImportLabel htmlFor='game-data-input' id="gd-label">Import file</ImportLabel>
          <input type='file' id='game-data-input' onChange={(e) => handleFileChosen(e)} />
        </GameDataDiv>
      </GameOptions>
      <QuestionBox>
        <Card.Group>
          {questions.map((q) => (<QuestionCard
            key={q.questionId}
            json={q}
            questionChange={questionChange}
            setQuestionChange={setQuestionChange}
            questions={questions} // For fetch
            quizName={quizName}
            thumbnail={thumbnail} />))}
        </Card.Group>
      </QuestionBox>
    </EditGameBody>
  )
}

export default EditGame;