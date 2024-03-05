import React from 'react';
const {useState} = React;
import axios from 'axios';

//TODO: review.photos
// Recommend checkmark

const ReviewsCard = ({review}) => {

  const options = {
    headers: {
      'Authorization': `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`,
    }
  };

  const [ hasSetHelpfulness, setHasSetHelpfulness ] = useState(false)

  // console.log(review, 'review')

  const [reviewHelpful, setReviewHelpful] = useState(review.helpfulness);

  const date = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const dateItem = new Date(review.date);
  const formatDate = new Intl.DateTimeFormat('en-US',date);
  const finalDate = formatDate.format(dateItem);

  const handleYes = () => {
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews/${review.review_id}/helpful`, null , options)
      .then(() => {
        console.log("Successfully updated helpfulness")
      })
      .then(()=> setHasSetHelpfulness(true))
      .catch((err) => {
        console.error("Error adding helpfulness count", err);
      })
  }

  return (
    <div className="rr-card">
      <p>Rating: {review.rating} Star(s)</p>
      {review.recommend ? <p className="rr-recommend">Recommended</p> : ""}

      <p className="rr-summary">Summary: {review.summary}</p>

      <p className="rr-body">Review Body: {review.body}</p>
      {review.photos ? review.photos.map((photo, index) => {
        return <img key={index} className="rr-photo" src={photo.url}/>
      }) : ""}
      <p>Name: {review.reviewer_name}</p>

      <p>Date: {finalDate}</p>


      {review.response ? <p className="rr-response">Response: {review.response}</p> : ""}

      <div>Helpful?</div>

      {!hasSetHelpfulness ?
        <div><span onClick={handleYes} className="yes-answer-button report-button">Yes</span> ({reviewHelpful})</div>
        : <div><span className="yes-answer-button report-button">Yes</span> ({reviewHelpful + 1})</div>
      }
    </div>
  )
}

export default ReviewsCard