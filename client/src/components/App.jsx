//client/components/App.js
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import ProductOverview from './ProductOverview/ProductOverview.jsx';
import Related from './Related_Items/Related.jsx';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers/questions.jsx';

//https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews/meta/?product_id=65631

const App = () => {
  const [productID, setProductID] = useState(0);
  const [metaData, setMetaData] = useState({});

  const options = {
    headers: {
      'Authorization': `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`
    }
  };

  useEffect ((productID) => {
    let currentID = 0;
    if (productID === 0 || currentID !== productID) {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products`, options)
        .then((response) => {
          console.log(response.data[0].id);
          setProductID(response.data[0].id);
          currentID = productID;
          console.log(productID);
        })
        .catch(() => {
          console.error('Couldnt grab ID');
        })
        // .then(() => {
        //   axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews/meta/?product_id=${productID}`, options)
        //     .then((data) => {
        //       setMetaData(data);
        //       console.log(metaData);
        //     })
        // })
        // .catch(() => {
        //   console.error('Hey this didnt work');
        // })
    }
  }, []);


  return (
    <div className="main-container">
      <h2>Logo</h2>
      <div className="widget-container"><ProductOverview id={productID}/></div>
      <div className="widget-container"><Related id={productID}/></div>
      <div className="widget-container"><RatingsAndReviews id={productID}/></div>
      <div className="widget-container"><QuestionsAndAnswers id={productID}/></div>
    </div>
  );
};

export default App;