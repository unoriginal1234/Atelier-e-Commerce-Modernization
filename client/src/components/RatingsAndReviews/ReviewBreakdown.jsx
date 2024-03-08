import React from 'react';
const { useState, useEffect } = React;
import ProductBreakdown from './ProductBreakdown.jsx'

const ReviewBreakdown = ({reviewsMeta, filterHandler}) => {

  const [ average, setAverage ] = useState(0)
  const [ fiveStars, setFiveStars ] = useState(0)
  const [ fourStars, setFourStars ] = useState(0)
  const [ threeStars, setThreeStars ] = useState(0)
  const [ twoStars, setTwoStars ] = useState(0)
  const [ oneStar, setOneStar ] = useState(0)
  const [ totalDenominator, setTotalDenominator ] = useState(1)


  useEffect(()=>{populateStars()}, [reviewsMeta.ratings])
  useEffect(()=>{getAverage()}, [oneStar])

  const populateStars = () => {

    if (!reviewsMeta.ratings) {
      return (<div>Loading...</div>)
    }

    if (reviewsMeta.ratings['5']) {
      // console.log(parseInt(reviewsMeta.ratings['5']), 'five not state')
      setFiveStars(parseInt(reviewsMeta.ratings['5']))
    }

    if (reviewsMeta.ratings['4']) {
      setFourStars(parseInt(reviewsMeta.ratings['4']))
    }

    if (reviewsMeta.ratings['3']) {
      setThreeStars(parseInt(reviewsMeta.ratings['3']))
    }

    if (reviewsMeta.ratings['2']) {
      setTwoStars(parseInt(reviewsMeta.ratings['2']))
    }

    if (reviewsMeta.ratings['1']) {
      setOneStar(parseInt(reviewsMeta.ratings['1']))
    }
  }


  const getAverage = () => {
    if (!reviewsMeta.ratings) {
      return (<div>Loading...</div>)
    }

    let numerator = (fiveStars * 5 + fourStars * 4 + threeStars * 3 + twoStars * 2 + oneStar)
    // console.log(numerator, 'numer')

    let denominator = (fiveStars + fourStars + threeStars + twoStars + oneStar)
    setTotalDenominator(denominator)

    let currentAverage = numerator / denominator
    Math.round(currentAverage * 10) / 10

    setAverage(Math.round(currentAverage * 10) / 10)
  }

  if (!reviewsMeta.ratings) {
    return (<div>Loading...</div>)
  }

  return (
    <div className="rr-breakdown">
      <div className="rr-star-and-breakdown-container">
        <div className="rr-rating-breakdown">{average}</div>
        <div className="Stars" style={{ '--rating': average }}></div>
      </div>
      <p>{Math.round(parseInt(reviewsMeta.recommended.true) / (parseInt(reviewsMeta.recommended.true) + parseInt(reviewsMeta.recommended.false)) * 100)} % of reviews recommend this product</p>
      <div className="rr-star-meters">
        <p onClick={()=>filterHandler(5)}>5 stars<meter value={fiveStars / totalDenominator }></meter></p>

        <p onClick={()=>filterHandler(4)}>4 stars<meter value={fourStars / totalDenominator }></meter></p>

        <p onClick={()=>filterHandler(3)}>3 stars<meter value={threeStars / totalDenominator }></meter></p>

        <p onClick={()=>filterHandler(2)}>2 stars<meter value={twoStars / totalDenominator }></meter></p>

        <p onClick={()=>filterHandler(1)}>1 star<meter value={oneStar / totalDenominator }></meter></p>
      </div>

      <ProductBreakdown reviewsMeta={reviewsMeta}/>
    </div>
  )
}

export default ReviewBreakdown