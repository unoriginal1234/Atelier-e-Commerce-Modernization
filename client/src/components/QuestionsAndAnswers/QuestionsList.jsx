import React from 'react';
import QuestionItem from './QuestionItem.jsx';
const QuestionsList = ({ questionData, token, handleQuestionsList, productData }) => {

  return (
    <div className="question-list-container">
      {questionData.map((question) => {
        return <QuestionItem key={question.question_id} questionData={questionData} question={question} token={token} handleQuestionsList={handleQuestionsList} productData={productData}/>
      })}
    </div>
  )

}

export default QuestionsList;

