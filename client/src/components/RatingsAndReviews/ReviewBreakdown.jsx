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
  const [ bolded, setBolded ] = useState([])

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

  const addStyle = (num) => {
    if (bolded.includes(num)) {
      let newBoldList = bolded.slice(0, bolded.indexOf(num)).concat(bolded.slice(bolded.indexOf(num) + 1))
      setBolded(newBoldList)
    } else {
      let newBoldList = bolded.slice()
      newBoldList.push(num)
      setBolded(newBoldList)
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
        <p style={bolded.includes(5) ? {fontWeight:"bold"} : {fontWeight:"normal"}} onClick={()=>
          {filterHandler(5)
            addStyle(5)
          }}>5 stars<meter value={fiveStars / totalDenominator }></meter></p>

        <p style={bolded.includes(4) ? {fontWeight:"bold"} : {fontWeight:"normal"}} onClick={()=>
          {filterHandler(4)
            addStyle(4)
          }}>4 stars<meter value={fourStars / totalDenominator }></meter></p>

        <p style={bolded.includes(3) ? {fontWeight:"bold"} : {fontWeight:"normal"}} onClick={()=>
          {filterHandler(3)
            addStyle(3)
        }}>3 stars<meter value={threeStars / totalDenominator }></meter></p>

        <p style={bolded.includes(2) ? {fontWeight:"bold"} : {fontWeight:"normal"}}
        onClick={()=>{filterHandler(2)
        addStyle(2)}}>2 stars<meter value={twoStars / totalDenominator }></meter></p>

        <p style={bolded.includes(1) ? {fontWeight:"bold"} : {fontWeight:"normal"}}
        onClick={()=>{filterHandler(1)
        addStyle(1)}}>1 star<meter value={oneStar / totalDenominator }></meter></p>
      </div>

      <ProductBreakdown reviewsMeta={reviewsMeta}/>
    </div>
  )
}

export default ReviewBreakdown