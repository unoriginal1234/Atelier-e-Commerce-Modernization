import React, {useState, useEffect} from 'react';
import QuestionItem from './QuestionItem.jsx';
const QuestionsList = ({ questionData, token, handleQuestionsList, productData, id }) => {
  const [displayedQuestions, setDisplayedQuestions] = useState(2);
  const handleSeeMore = () => {
    setDisplayedQuestions(prevDisplayedQuestions=> prevDisplayedQuestions + 2);
  }
  useEffect(()=> {
    setDisplayedQuestions(2);
  },[id])
  const minQuestionData = questionData.slice(0,displayedQuestions);
  return (
    <div className="question-list-container">
      {minQuestionData.map((question) => {
       return <QuestionItem
      key={question.question_id}
      questionData={questionData}
      question={question}
      token={token}
      handleQuestionsList={handleQuestionsList}
      productData={productData}
      product_id={id}
      />
      })}
      {questionData.length > displayedQuestions && (
        <button onClick={handleSeeMore} >See More</button>
      )}
    </div>
  )

}

export default QuestionsList;

