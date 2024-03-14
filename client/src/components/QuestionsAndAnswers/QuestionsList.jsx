import React, {useState, useEffect} from 'react';
import {createPortal} from 'react-dom';
import QuestionItem from './QuestionItem.jsx';
import QuestionModalContent from './QuestionModalContent.jsx';
const QuestionsList = ({ questionData, token, handleQuestionsList, productData, id }) => {
  const [displayedQuestions, setDisplayedQuestions] = useState(2);
  const [showModal, setShowModal] = useState(false);
  const handleSeeMore = () => {
    setDisplayedQuestions(prevDisplayedQuestions=> prevDisplayedQuestions + 50);
  }
  useEffect(()=> {
    setDisplayedQuestions(2);
  },[id])
  const minQuestionData = questionData.slice(0,displayedQuestions);
  return (
    <div className="question-list-container">
      {minQuestionData.map((question, index) => {
       return <QuestionItem
      key={index}
      questionData={questionData}
      question={question}
      token={token}
      handleQuestionsList={handleQuestionsList}
      productData={productData}
      product_id={id}
      id={id}

      />
      })}
      <div className="bottom-buttons-container">
        {questionData.length > displayedQuestions && (
          <button className="more-questions-button" onClick={handleSeeMore} >More Answered Questions</button>
        )}
        <div>
          <button onClick={() => setShowModal(true)}>Add a Question</button>
          {showModal && createPortal(
            <div onClick={()=> setShowModal(false)} className="question-modal-container">

                <QuestionModalContent
                onClose={()=> setShowModal(false)}
                token={token}
                handleQuestionsList={handleQuestionsList}
                productData={productData}
                />
            </div>
            , document.body)}
        </div>
      </div>

    </div>
  )

}

export default QuestionsList;

