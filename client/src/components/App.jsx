//client/components/App.js
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import ProductOverview from './ProductOverview/ProductOverview.jsx';
import Related from './Related_Items/Related.jsx';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';

//https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews/meta/?product_id=65631

const App = () => {
  //-------------------------------------------------------
  //Shared App states
  //-------------------------------------------------------
  const [productID, setProductID] = useState(65631);
  const [metaData, setMetaData] = useState({});


  //-------------------------------------------------------
  //Functions
  //-------------------------------------------------------

  const changeID = function (val) {
    setProductID(val);
  }

  //-------------------------------------------------------
  //Use Effect & relevant objects
  //-------------------------------------------------------

  const options = {
    headers: {
      'Authorization': `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`
    }
  };

    //Meta UseEffect
  useEffect (() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews/meta/?product_id=${productID}`, options)
      .then((response) => {
        setMetaData(response.data);
      })
      .catch((err) => {
        console.log('Error retrieving meta data', err);
      })
  }, [productID]);

  return (
    <div className="main-container">
      <h2>Logo</h2>
      <div className="widget-container"><ProductOverview id={productID}/></div>
      <div className="widget-container"><Related id={productID} meta={metaData} setID={changeID}/></div>
      <div className="widget-container"><RatingsAndReviews id={productID}/></div>
      <div className="widget-container"><QuestionsAndAnswers id={productID}/></div>
    </div>
  );
};

export default App;