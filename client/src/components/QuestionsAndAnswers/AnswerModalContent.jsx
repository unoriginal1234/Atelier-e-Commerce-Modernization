import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createPortal } from 'react-dom';
const AnswerModalContent = ({question, productData, onClose, token, answerID, handleQuestionsList}) => {

  const [yourAnswer, setYourAnswer] = useState('');
  const [yourNickname, setYourNickname] = useState('');
  const [yourEmail, setYourEmail] = useState('');
  const [yourPhotos, setYourPhotos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [invalid,setInvalid] = useState(false);
  const handleYourAnswer = (e) => {
    setYourAnswer(e.target.value);
  }
  const handleYourNickname = (e) => {
    setYourNickname(e.target.value);
  }
  const handleYourEmail = (e) => {
    setYourEmail(e.target.value);
  }
  const handlePostAnswers = () => {
    const data = {
      "body":yourAnswer,
      "name":yourNickname,
      "email":yourEmail,
      "photos":yourPhotos
    }
    axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/qa/questions/${question.question_id}/answers`,data, token)
      .then(()=> {
        handleQuestionsList();
      })
      .catch((err)=> {
        console.error("Error adding answer", err);
      })
  }
  const handleUpload = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    const photoArr = [];
    photoArr.push(file);
    setYourPhotos(photoArr);

  }
  const validateForm = (event) => {
    event.preventDefault();
    if(yourAnswer.length <= 0 || yourNickname.length <= 0 || yourEmail<= 0) {
      setInvalid(true);
    } else {
      setInvalid(false);
      handlePostAnswers();
      onClose();
    }
  }


  return (

    <form className="answer-modal-content">
      <h2>Submit Your Answer</h2>
      <h3>{productData.name} : {question.question_body}</h3>

      <label htmlFor="answer">Your Answer:</label>
      <textarea id="answer" maxLength="1000" value={yourAnswer} onChange={handleYourAnswer} />

      <label htmlFor="nickname">What is your nickname:</label>
      <input id="nickname" maxLength="60" value={yourNickname} onChange={handleYourNickname} placeholder="Example: jack543!" />
      (For privacy reasons, do not use your full name or email address)

      <label htmlFor="email">Your email:</label>
      <input id="email" maxLength="60" value={yourEmail} onChange={handleYourEmail} placeholder="Why did you like the product or not?" />
      (For authentication reasons,  you will not be emailed)

      <input type="file" onChange={handleUpload} ></input>
      <button onClick={validateForm}>Submit</button>
      {invalid && (
        <div className="invalid-inputs">
          <h3>You must enter the following:</h3>
          <p>This error will occur if :</p>
          <p>1. Any mandatory fields are blank</p>
          <p>2. The email address provided is not in correct email format</p>
          <p>3. The images selected are invalid or unable to be uploaded.</p>
        </div>
      )}
    </form>

  )

}

export default AnswerModalContent;