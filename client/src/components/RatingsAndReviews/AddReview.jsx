import React from 'react'

const AddReview = ({addReviewClickHandler}) => {
  return (
    <div>
      <button className="btn-gradient-1" onClick={addReviewClickHandler}>Add Review +</button>
    </div>
  )
}

export default AddReview