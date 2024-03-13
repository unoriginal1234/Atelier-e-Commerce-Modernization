import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'
import AnswerList from './AnswerList.jsx';
import axios from 'axios';
import AnswerModalContent from './AnswerModalContent.jsx';
import { FcCheckmark } from "react-icons/fc";
const QuestionItem = ({ questionData, question, token, handleQuestionsList, productData, product_id }) => {

  const question_id = question.question_id;
  const [questionHelpful , setQuestionHelpful] = useState(question.question_helpfulness);
  const [showModal, setShowModal] = useState(false);
  const [answerID, setAnswerID] = useState('');
  const [disabled, setDisabled] = useState(false);
  const handleYes = () => {
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/qa/questions/${question_id}/helpful`, null ,token)
      .then(() => {
        setDisabled(true);
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
  const forImageID = (id) => {
    setAnswerID(id);
  }
  return (

    <div className="qa-container">
      <div className="eachQ-container">
        <big className="Q-item">
          Q: {question.question_body}
        </big>
        <div className="eachQ-rightSide-container">
          Helpful?
          <div style={{display: "flex",flexDirection: "row",alignItems: "center"}} >
            {disabled ?
            <FcCheckmark type="text" className="yes-button answer-button"/>
            :
            <FcCheckmark type="text" onClick={handleYes} className="yes-button answer-button"/>}
             ({questionHelpful})
          </div>
          |
          <u onClick={() => setShowModal(true)}className="answer-button">Add Answer</u>
          {showModal && createPortal(
          <div className="answer-modal-container">

              <AnswerModalContent question={question} productData={productData} onClose={()=> setShowModal(false)} token={token} answerID={answerID} handleQuestionsList={handleQuestionsList}/>

          </div>
          , document.body)}
        </div>
      </div>
      <AnswerList question_id={question_id} token={token} forImageID={forImageID} product_id={product_id}/>
    </div>

  )

}

export default QuestionItem;