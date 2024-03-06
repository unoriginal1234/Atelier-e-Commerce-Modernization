//client/components/App.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ProductOverview from './ProductOverview/ProductOverview.jsx';
import Related from './Related_Items/Related.jsx';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';



const App = () => {
  //-------------------------------------------------------
  // Shared App states and variables
  //-------------------------------------------------------
  const [productID, setProductID] = useState(65631);
  const [metaData, setMetaData] = useState({});
  const ratingsAndReviewsRef = useRef(null); // to scroll down to ratings and reviews from product overview
  //-------------------------------------------------------
  // Functions
  //-------------------------------------------------------
  // function to scroll down to ratings and reviews on 'read all reviews click'
  const scrollToRatingsAndReviews = () => {
    ratingsAndReviewsRef.current.scrollToRatingsAndReviews();
  };

  const changeID = function (val) {
    setProductID(val);
  }
  //-------------------------------------------------------
  // Use Effect & relevant objects
  //-------------------------------------------------------

  const token = {
    headers: {
      'Authorization': process.env.REACT_APP_API_KEY,
    }
  };

    // Meta UseEffect
  useEffect (() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${productID}`, token)
       .then((response) => {
        setMetaData(response.data);
       })
       .catch((err) => {
        console.log('Error retrieving meta data', err);
       })
  }, [productID]);

  return (
    <div className="main-container">
      {/* Logo and search input, fake stuff to make it look more real */}
      <div className="widget-container nav-bar"><h1>KFC Logo</h1>
      <span className="fake-search"> <input placeholder="Search" />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
    <path fill="none" d="M0 0h24v24H0z"/>
    <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg></span></div>

      <div className="widget-container p-o"><ProductOverview id={productID} onClickReadAllReviews={scrollToRatingsAndReviews}/></div>
      <div className="widget-container"><Related id={productID} meta={metaData} setID={changeID}/></div>
      <div className="widget-container"><RatingsAndReviews id={productID} token={token} ref={ratingsAndReviewsRef}/></div>
      <div className="widget-container"><QuestionsAndAnswers id={productID} token={token} productData={metaData}/></div>
    </div>
  );
};

export default App;