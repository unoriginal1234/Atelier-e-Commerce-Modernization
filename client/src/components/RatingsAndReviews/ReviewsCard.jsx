import React from 'react';

//TODO: review.photos

const ReviewsCard = ({review}) => {
  return (
    <div className="rr-card">
    <p>Review Body: {review.body}</p>
    <p>Date: {review.date}</p>
    <p>Helpful?: {review.helpfulness}</p>
    <p>Rating: {review.rating}</p>
    <p>Recommend: {review.recommend}</p>
    <p>Response: {review.response}</p>
    <p>ID: {review.review_id}</p>
    <p>Name: {review.reviewer_name}</p>
    <p>Summary: {review.summary}</p>
    </div>
  )
}

export default ReviewsCard