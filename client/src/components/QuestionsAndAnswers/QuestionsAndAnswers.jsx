//quests
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchAnswers from './SearchAnswers.jsx';
import QuestionsList from './QuestionsList.jsx';

const QuestionsAndAnswers = ( { id, token } ) => {
  const [questionData, setQuestionData] = useState(null);
  const [oldData, setOldData] = useState(null);
  const [filterData, setFilterData] = useState(null);

  const handleSearch = (query) => {
    setOldData(questionData);
    const result = filterData.filter(question => {
      return question.question_body.toLowerCase().includes(query.toLowerCase());
    })
    setQuestionData(result);
    if(query.length < 3) {
      setQuestionData(oldData);
    }
  }
  //function to handle axios get request for data
  const handleQuestionsList = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/qa/questions/?product_id=${id}`, token)
      .then((results) => {
        //const question = results.data.results;
        setQuestionData(results.data.results);
        setFilterData(results.data.results);
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
        QUESTIONS & ANSWERS
        <div>
          <SearchAnswers handleSearch={handleSearch}/>
        </div>
        <div>
          <QuestionsList questionData={questionData} token={token} handleQuestionsList={handleQuestionsList}/>
        </div>
      </div>

    )
  }
}

export default QuestionsAndAnswers;