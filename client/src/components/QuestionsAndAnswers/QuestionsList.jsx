import React from 'react';
import QuestionItem from './QuestionItem.jsx';
const QuestionsList = ({ questionData }) => {
  console.log(questionData);
  return (
    <div>
      {questionData.map((question) => {
        return <QuestionItem key={question.question_id} question={question}/>
      })}
    </div>
  )

}

export default QuestionsList;

