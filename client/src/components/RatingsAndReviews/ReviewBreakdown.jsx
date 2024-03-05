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
    let numerator = (parseInt(reviewsMeta.ratings['5']) * 5 + parseInt(reviewsMeta.ratings['4']) * 4 + parseInt(reviewsMeta.ratings['3']) * 3 + parseInt(reviewsMeta.ratings['2']) * 2 + parseInt(reviewsMeta.ratings['1']))

    let denominator = (parseInt(reviewsMeta.ratings['5']) + parseInt(reviewsMeta.ratings['4']) + parseInt(reviewsMeta.ratings['3']) + parseInt(reviewsMeta.ratings['2']) + parseInt(reviewsMeta.ratings['1']))

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