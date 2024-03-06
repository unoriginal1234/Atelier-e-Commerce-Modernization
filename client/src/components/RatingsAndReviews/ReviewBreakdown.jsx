import React from 'react';
const { useState, useEffect } = React;
import ProductBreakdown from './ProductBreakdown.jsx'

const ReviewBreakdown = ({reviewsMeta, filterHandler}) => {

  const [ average, setAverage ] = useState(0)

  useEffect(()=>{getAverage()}, [reviewsMeta.ratings])

  const getAverage = () => {
    if (!reviewsMeta.ratings) {
      return 0
    }

    let fiveStars = 0;
    let fourStars = 0;
    let threeStars = 0;
    let twoStars = 0;
    let oneStar = 0;

    if (reviewsMeta.ratings['5']) {
      fiveStars = parseInt(reviewsMeta.ratings['5'])
    }

    if (reviewsMeta.ratings['4']) {
      fourStars = parseInt(reviewsMeta.ratings['4'])
    }

    if (reviewsMeta.ratings['3']) {
      threeStars = parseInt(reviewsMeta.ratings['3'])
    }

    if (reviewsMeta.ratings['2']) {
      twoStars = parseInt(reviewsMeta.ratings['2'])
    }

    if (reviewsMeta.ratings['1']) {
      oneStar = parseInt(reviewsMeta.ratings['1'])
    }

    let numerator = (fiveStars * 5 + fourStars * 4 + threeStars * 3 + twoStars * 2 + oneStar)

    let denominator = (fiveStars + fourStars + threeStars + twoStars + oneStar)

    let currentAverage = numerator / denominator
    Math.round(currentAverage * 10) / 10

    setAverage(Math.round(currentAverage * 10) / 10)
  }

  if (!reviewsMeta.ratings) {
    return (<div>Loading...</div>)
  }



  return (
    <div className="rr-breakdown">
      <h5>Rating Breakdown</h5>
      <h1>{average}</h1>
      <p onClick={()=>filterHandler(5)}>5 stars: {reviewsMeta.ratings['5']}</p>
      <p onClick={()=>filterHandler(4)}>4 stars: {reviewsMeta.ratings['4']}</p>
      <p onClick={()=>filterHandler(3)}>3 stars: {reviewsMeta.ratings['3']}</p>
      <p onClick={()=>filterHandler(2)}>2 stars: {reviewsMeta.ratings['2']}</p>
      <p onClick={()=>filterHandler(1)}>1 stars: {reviewsMeta.ratings['1']}</p>
      <ProductBreakdown reviewsMeta={reviewsMeta}/>
    </div>
  )
}

export default ReviewBreakdown