import React from 'react'

const AddReview = ({addReviewClickHandler}) => {
  return (
    <div>
      <button className="rr-see-more-btn" onClick={addReviewClickHandler}>Add Review +</button>
    </div>
  )
}

export default AddReview