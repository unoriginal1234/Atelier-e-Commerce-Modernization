import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'
import AnswerList from './AnswerList.jsx';
import axios from 'axios';
import AnswerModalContent from './AnswerModalContent.jsx';
const QuestionItem = ({ questionData, question, token, handleQuestionsList, productData }) => {

  const question_id = question.question_id;
  const [questionHelpful , setQuestionHelpful] = useState(question.question_helpfulness);
  const [showModal, setShowModal] = useState(false);

  const handleYes = () => {
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/qa/questions/${question_id}/helpful`, null ,token)
      .then(() => {
        handleQuestionsList();
        console.log("Successfully updated helpfulness")
      })
      .catch((err) => {
        console.error("Error adding helpfulness count", err);
      })
  }
  useEffect(()=> {
    setQuestionHelpful(question.question_helpfulness)
  }, [questionData])

  return (

    <div className="qa-container">
      <div className="eachQ-container">
        <big>
          Q: {question.question_body}
        </big>
        <div className="eachQ-rightSide-container">
          Helpful?
          <div>
            <span onClick={handleYes} className="yes-button answer-button">Yes</span> ({questionHelpful})
          </div>
          |
          <u onClick={() => setShowModal(true)}className="answer-button">Add Answer</u>
          {showModal && createPortal(
          <div className="answer-modal-container">

              <AnswerModalContent question={question} productData={productData} onClose={()=> setShowModal(false)}/>

          </div>
          , document.body)}
        </div>
      </div>
        <AnswerList question_id={question_id} token={token} />
    </div>

  )

}

export default QuestionItem;