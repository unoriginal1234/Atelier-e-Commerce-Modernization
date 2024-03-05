import React from 'react';
import ReviewsCard from './ReviewsCard.jsx'

const ReviewsList = ({reviews}) => {
  return (
    <div className="rr-list">
    <h5>Reviews List</h5>
    {
      reviews.map((review, index)=>{
        return <ReviewsCard review={review} key={index}/>
      })
    }
    </div>
  )
}

export default ReviewsList