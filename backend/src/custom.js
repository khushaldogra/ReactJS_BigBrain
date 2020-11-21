/*
 For a given data structure of a question, produce another
 object that doesn't contain any important meta data (e.g. the answer)
 to return to a "player"
*/
// GET question
export const quizQuestionPublicReturn = question => {
  console.log('See question: ', question);
  let temp = {
    "name":question.name,
    "duration":question.duration,
    "type":question.type,
    "answers":[],
    "videolink": question.videolink,
    "points": question.points
  }
  question.answers.forEach(ans => {
    temp.answers.push({
      "answerId":ans.answerId,
      "title":ans.title,
      "color":ans.color
    })
  })
  return temp;
};

/*
 For a given data structure of a question, get the IDs of
 the correct answers (minimum 1).
*/
// GET answer, PUT answer
export const quizQuestionGetCorrectAnswers = question => {
  let idArray = [];
  let answers = question.answers

 answers.forEach(elem => {
   console.log(elem)
    if (elem.correct) {
      idArray.push(elem.answerId);
    }
  });
  
  return idArray;
};

/*
 For a given data structure of a question, get the IDs of
 all of the answers, correct or incorrect.
*/
export const quizQuestionGetAnswers = question => {
  let idArray = [];

  question.answers.forEach(elem => {
    idArray.push(elem.answerId);
  });
  
  return idArray;
};

/*
 For a given data structure of a question, get the duration
 of the question once it starts. (Seconds)
*/
// POST advance
export const quizQuestionGetDuration = question => {
  return question["duration"];
};
