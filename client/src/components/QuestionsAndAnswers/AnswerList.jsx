import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnswerItem from './AnswerItem.jsx';
const AnswerList = ({ question_id, token }) => {

  //console.log(token);
  const [answers, setAnswers] = useState([]);

  const handleAnswersList = () => {

    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/qa/questions/${question_id}/answers`, token)
      .then((results) => {
        //console.log(results.data.results);
        const answersList = results.data.results;
        setAnswers(answersList);
      })
      .catch((err) => {
        console.error("Error getting answers list:", err);
      })
  }
  useEffect(() => {
    handleAnswersList();
  }, [])

  return (

    <div>
      {answers.map(answer => {
        return <AnswerItem key={answer.answer_id} answers={answers} answer={answer} handleAnswersList={handleAnswersList} token={token} />
      })}
    </div>

  )

}

export default AnswerList;