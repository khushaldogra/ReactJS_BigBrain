/*
 For a given data structure of a question, produce another
 object that doesn't contain any important meta data (e.g. the answer)
 to return to a "player"
*/
// GET question
export const quizQuestionPublicReturn = question => {
  console.log('See question: ', question);
  let answers = question.answers
  answers.forEach(ans => {
    ans.correct = null
  })
  question = {...question, answers:answers}
  return question;
};

/*
 For a given data structure of a question, get the IDs of
 the correct answers (minimum 1).
*/
// GET answer, PUT answer
export const quizQuestionGetCorrectAnswers = question => {
  let idArray = [];

  question.answers.forEach(elem => {
    if (elem["correct"] === true) {
      idArray.push(elem["answerId"]);
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
    idArray.push(elem["answerId"]);
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
