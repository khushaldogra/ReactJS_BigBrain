import config from './config';

function updateQuiz(questions, quizName, thumbnail, quizID) {
    const token = localStorage.getItem('token');
    const payload = {
      'questions': questions,
      'name': quizName,
      'thumbnail': thumbnail
    }
    const options = {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
    const path = `${config.basePath}/admin/quiz/${quizID}`;
    return fetch(path, options)
      .then(res => {
        if (!res.ok) {
          throw res;
        }
      })
}

export { updateQuiz }