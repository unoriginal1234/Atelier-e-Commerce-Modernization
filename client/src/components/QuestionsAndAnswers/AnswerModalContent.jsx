import React, { useState, useEffect } from 'react';

const AnswerModalContent = ({question, productData, onClose}) => {

  const [yourAnswer, setYourAnswer] = useState('');
  const handleYourAnswer = (e) => {
    setYourAnswer(e.target.value);
  }
  return (

    <div className="answer-modal-content">
      <h2>Submit Your Answer</h2>
      <h3>{productData.name}:{question.question_body}</h3>
      <label>
        Your Answer:
      </label>
      <textarea maxLength="1000" value={yourAnswer} onChange={handleYourAnswer}/>
      What is your nickname: <input maxLength="60" placeholder="Example: jack543!"/>
      (For privacy reasons, do not use your full name or email address)
      Your email: <input maxLength="60" placeholder="Example: jack@email.com"/>
      (For authentication reasons,  you will not be emailed)
      <button>Upload photos</button>
      <button onClick={onClose}>Submit</button>
    </div>

  )

}

export default AnswerModalContent;