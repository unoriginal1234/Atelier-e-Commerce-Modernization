import React from 'react'

const AddReview = ({addReviewClickHandler}) => {
  return (
    <div>
      <button onClick={addReviewClickHandler}>Add Review</button>
    </div>
  )
}

export default AddReview