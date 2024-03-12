import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createPortal } from 'react-dom';
const QuestionModalContent = ({onClose, token, handleQuestionsList, productData}) => {

  const [yourQuestion, setYourQuestion] = useState('');
  const [yourNickname, setYourNickname] = useState('');
  const [yourEmail, setYourEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const handleYourQuestion = (e) => {
    setYourQuestion(e.target.value);
  }
  const handleYourNickname = (e) => {
    setYourNickname(e.target.value);
  }
  const handleYourEmail = (e) => {
    setYourEmail(e.target.value);
  }
  const handlePostQuestions = () => {

    const data = {
      "body":yourQuestion,
      "name":yourNickname,
      "email":yourEmail,
      "product_id": productData.id
    }
    axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/qa/questions/?product_id=${productData.id}`,data, token)
      .then(()=> {
        handleQuestionsList();
      })
      .catch((err)=> {
        console.error("Error adding question", err);
      })
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if(yourQuestion.length <= 0 || yourNickname.length <= 0|| yourEmail <= 0) {
      setInvalid(true);
    } else {
      setInvalid(false);
      handlePostQuestions();
      onClose();
    }

  }

  return (

    <div className="question-modal-content">
      <h2>Ask Your Question</h2>

      <h3>About the {productData.name}</h3>

      <label htmlFor="question">Your Question:</label>
      <textarea id="question" maxLength="1000" value={yourQuestion} onChange={handleYourQuestion} />

      <label htmlFor="nickname">What is your nickname:</label>

      <input id="nickname" maxLength="60" value={yourNickname} onChange={handleYourNickname} placeholder="Example: jackson11!" />

      (For privacy reasons, do not use your full name or email address)

      <label htmlFor="email">Your email:</label>

      <input id="email" maxLength="60" value={yourEmail} onChange={handleYourEmail} placeholder="Why did you like the product or not?" />

      (For authentication reasons,  you will not be emailed)
      <button onClick={handleSubmit}>Submit</button>

      {invalid && (
        <div className="invalid-inputs">
          <h3>You must enter the following:</h3>
          <p>This error will occur if :</p>
          <p>1. Any mandatory fields are blank</p>
          <p>2. The email address provided is not in correct email format</p>
        </div>
      )}
    </div>

  )

}

export default QuestionModalContent;