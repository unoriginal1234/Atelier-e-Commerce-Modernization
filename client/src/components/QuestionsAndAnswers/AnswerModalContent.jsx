import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createPortal } from 'react-dom';
const AnswerModalContent = ({question, productData, onClose, token, answerID, handleQuestionsList}) => {

  const [yourAnswer, setYourAnswer] = useState('');
  const [yourNickname, setYourNickname] = useState('');
  const [yourEmail, setYourEmail] = useState('');
  const [yourPhotos, setYourPhotos] = useState([]);
  const [showModal, setShowModal] = useState(false);
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
    console.log(yourPhotos);
    axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/qa/questions/${question.question_id}/answers`,data, token)
      .then(()=> {
        handleQuestionsList();
      })
      .catch((err)=> {
        console.error("Error adding answer", err);
      })
  }
  const handleUpload = (e) => {
    let photos = [];
    photos.push(URL.createObjectURL(e.target.files[0]));
    console.log(photos);
    setYourPhotos(photos);

  }
  const handleSubmit = () => {
    handlePostAnswers();
    onClose();
  }

  return (

    <div className="answer-modal-content">
      <h2>Submit Your Answer</h2>
      <h3>{productData.name} : {question.question_body}</h3>
      <label>
        Your Answer:
      </label>
      <textarea maxLength="1000" value={yourAnswer} onChange={handleYourAnswer}/>
      What is your nickname: <input maxLength="60" value={yourNickname} onChange={handleYourNickname} placeholder="Example: jack543!"/>
      (For privacy reasons, do not use your full name or email address)
      Your email: <input maxLength="60" value={yourEmail} onChange={handleYourEmail} placeholder="Example: jack@email.com"/>
      (For authentication reasons,  you will not be emailed)
      <label>Upload photos</label>
      <input type="file" onChange={handleUpload} ></input>
      <button onClick={handleSubmit}>Submit</button>
    </div>

  )

}

export default AnswerModalContent;