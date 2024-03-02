//quests
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionsList from './QuestionsList.jsx';
const QuestionsAndAnswers = ( { id } ) => {
  const [questionData, setQuestionData] = useState(null);
  const options = {
    headers: {
      'Authorization': `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`
    }
  };
  //function to handle axios get request for data
  const handleQuestionsList = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/qa/questions/?product_id=${id}`, options)
      .then((results) => {
        //const question = results.data.results;
        setQuestionData(results.data.results);
      })
      .catch((err) => {
        console.error(`Error trying to get questions list for product_id:${id}`);
      })
  }
  //on component mount, render question list data
  useEffect(() => {
    handleQuestionsList();
  }, [id])

  if(!questionData) {
    return <div>Loading...</div>
  } else {
    return (

      <div>
        <p>This is Q&A  </p>
        <QuestionsList questionData={questionData}/>


      </div>

    )
  }
}

export default QuestionsAndAnswers;