import React from 'react';

const ReviewBreakdown = ({reviewsMeta, filterHandler}) => {

  // console.log(reviewsMeta, 'reviews meta from inside Review Breakdown')
  // console.log(reviewsMeta.ratings.1, 'ratings')
  if (!reviewsMeta.ratings) {
    return (<div>Loading...</div>)
  }

  return (
    <div className="rr-breakdown" onClick={filterHandler}>
      <h5>Review Breakdown</h5>
      <p>5 stars: {reviewsMeta.ratings['5']}</p>
      <p>4 stars: {reviewsMeta.ratings['4']}</p>
      <p>3 stars: {reviewsMeta.ratings['3']}</p>
      <p>2 stars: {reviewsMeta.ratings['2']}</p>
      <p>1 stars: {reviewsMeta.ratings['1']}</p>
    </div>
  )
}

export default ReviewBreakdown