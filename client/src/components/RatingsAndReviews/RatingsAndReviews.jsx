import React from 'react';
const {useEffect, useState} = React;
import ReviewsList from './ReviewsList.jsx';
import axios from 'axios';
import ReviewBreakdown from './ReviewBreakdown.jsx';
import Sort from './Sort.jsx';
import AddReview from './AddReview.jsx';
import SeeMore from './SeeMore.jsx';

const RatingsAndReviews = ({id}) => {

  const [ reviews, setReviews ] = useState([]);
  const [ reviewsMeta, setReviewsMeta ] = useState([]);

  useEffect(() => {fetchData();}, [id]);

  const fetchData = () => {
    const options = {
      headers: {
        'Authorization': `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`,
      }
    };
    Promise.all([
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews/?product_id=${id}`, options),
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews/meta/?product_id=${id}`, options)
    ])
    .then(([reviewResponse, metaResponse]) => {
      // right now hard coding the limited response
      setReviews(reviewResponse.data.results.slice(0, 2));
      // console.log(reviewResponse.data, '-- review Response');
      setReviewsMeta(metaResponse.data)
      console.log(metaResponse.data, '--meta Response');
    })
    .catch(error => {
      console.error('Error fetching data:', error);
  // fake data
      // setData(product[0]);
      // setStylesData(styles);
      // setReviewsData(reviews);
    });
  };

  console.log(reviews, '-- Reviews data from API call');


  return (
    <>
    <h5>Ratings and Reviews</h5>
    <Sort />
    <div className="rr-container">
      <ReviewBreakdown reviewsMeta={reviewsMeta}/>
      <ReviewsList reviews={reviews}/>
    </div>
    <AddReview />
    <SeeMore />
    </>

  )
}

export default RatingsAndReviews;