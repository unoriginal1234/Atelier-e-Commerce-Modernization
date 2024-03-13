import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnswerImageItem from './AnswerImageItem.jsx';
import { FcApproval } from "react-icons/fc";
const AnswerItem = ({ answers, answer, handleAnswersList, token, forImageID }) => {
  const answer_id = answer.answer_id;
  const [answerHelpful, setAnswerHelpful] = useState(answer.helpfulness);
  const [reported, setReported] = useState(answer);
  const [disabled, setDisabled] = useState(false);
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
        setDisabled(true);
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
    forImageID(answer.answer_id);
  },[])
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
        <div className="answer-images-container">
          {answer.photos.map((photo, index) => {
            return <AnswerImageItem key={index}  photo={photo} token={token} />
          })}
        </div>
        <div>
          <small className="answer-small-container">

            <div>by {answer.answerer_name?.toLowerCase() === "seller" ? <strong>{answer.answerer_name}</strong> : answer.answerer_name}, {finalDate}</div>
             |
             <div>Helpful?</div>
             <div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
              {disabled ?
              <FcApproval className="yes-answer-button report-button"/>
              :
              <FcApproval onClick={handleYes} className="yes-answer-button report-button"/>}
               ({answerHelpful})
              </div>
               |
              <span className="report-button" onClick={handleReport}>Report</span>
          </small>
        </div>
      </div>
    </div>
  )

}

export default AnswerItem;