import React, { useState, useEffect } from 'react';
import axios from 'axios';
const AnswerItem = ({ answers, answer, handleAnswersList, token }) => {
  const answer_id = answer.answer_id;
  const [answerHelpful, setAnswerHelpful] = useState(answer.helpfulness);
  const date = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const dateItem = new Date(answer.date);
  const formatDate = new Intl.DateTimeFormat('en-US',date);
  const finalDate = formatDate.format(dateItem);

  const handleYes = () => {
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/qa/answers/${answer_id}/helpful`, null ,token)
      .then(() => {
        handleAnswersList();
        console.log("Successfully updated helpfulness")
      })
      .catch((err) => {
        console.error("Error adding helpfulness count", err);
      })
  }

  const handleReport = () => {
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/qa/answers/${answer_id}/report`, null ,token)
      .then(() => {
        handleAnswersList();
        console.log("Successfully reported answer")
      })
      .catch((err) => {
        console.error("Error adding reporting answer", err);
      })
  }
  useEffect(()=> {
    setAnswerHelpful(answer.helpfulness)
  }, [answers])
  return (
    <div className="answer-container">
      <h4>A:</h4>
      <div className="answer-body-container">
        <p className="answer-body-text">
          {answer.body}
        </p>
        <div>
          <small className="answer-small-container"><div>by {answer.answerer_name}, {finalDate}</div> | <div>Helpful?</div> <div><span onClick={handleYes} className="yes-answer-button report-button">Yes</span> ({answerHelpful})</div> | <span className="report-button" onClick={handleReport}>Report</span></small>
        </div>
      </div>
    </div>
  )

}

export default AnswerItem;