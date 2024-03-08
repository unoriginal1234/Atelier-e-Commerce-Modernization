import React from 'react';
import ReviewsCard from './ReviewsCard.jsx'

// TO DO -- If no reviews have been submitted for this product, then the list will collapse, and the button to submit a new review (section 1.2.7) will appear near the top of the module.

const ReviewsList = ({reviews}) => {
  return (
    <div className="rr-list">
    {
      reviews.map((review, index)=>{
        return <ReviewsCard review={review} key={index}/>
      })
    }
    </div>
  )
}

export default ReviewsList