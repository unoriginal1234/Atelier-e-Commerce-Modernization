import React, { useState } from 'react';
import axios from 'axios';

// TO DO : Upload photos

const NewReviewForm = ({submitReview, characteristics, id}) => {

  const [ isSize, setIsSize ] = useState(Object.keys(characteristics).indexOf('Size') > -1)
  const [ isWidth, setIsWidth ] = useState(Object.keys(characteristics).indexOf('Width') > -1)
  const [ isComfort, setIsComfort ] = useState(Object.keys(characteristics).indexOf('Comfort') > -1)
  const [ isQuality, setIsQuality ] = useState(Object.keys(characteristics).indexOf('Quality') > -1)
  const [ isLength, setIsLength ] = useState(Object.keys(characteristics).indexOf('Length') > -1)
  const [ isFit, setIsFit ] = useState(Object.keys(characteristics).indexOf('Fit') > -1)

  const [ rating, setRating ] = useState("")
  const ratingText = ['Poor', 'Fair', 'Average', 'Good', 'Great']
  const onRatingChange = (e) => {
    setRating(e.target.value)
  }

  const [ size , setSize ] = useState("")
  const sizeText = ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide']
  const onSizeChange = (e) => {
    setSize(e.target.value)
  }

  const [ width , setWidth ] = useState("")
  const widthText = ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide']
  const onWidthChange = (e) => {
    setWidth(e.target.value)
  }

  const [ comfort , setComfort ] = useState("")
  const comfortText = ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect']
  const onComfortChange = (e) => {
    setComfort(e.target.value)
  }

  const [ quality , setQuality ] = useState("")
  const qualityText = ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect']
  const onQualityChange = (e) => {
    setQuality(e.target.value)
  }

  const [ length , setLength ] = useState("")
  const lengthText = ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long']
  const onLengthChange = (e) => {
    setLength(e.target.value)
  }

  const [ fit , setFit ] = useState("")
  const fitText = ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']
  const onFitChange = (e) => {
    setFit(e.target.value)
  }

  const [ recommend, setRecommend ] = useState("true")
  const onRecommendChange = (e) => {
    setRecommend(e.target.value)
  }

  const [ reviewBody, setReviewBody ] = useState("")
  const onReviewBodyChange = (e) => {
    setReviewBody(e.target.value)
  }

  const [ reviewSummary, setReviewSummary ] = useState("")
  const onReviewSummaryChange = (e) => {
    setReviewSummary(e.target.value)
  }

  const [ nickName, setNickName ] = useState("")
  const onNickNameChange = (e) => {
    setNickName(e.target.value)
  }

  const [ email, setEmail ] = useState("")
  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  return (
    <div className="rr-modal-content">
      <h3>Write Your Review</h3>
      <h4>About the ____</h4>
      <div>
        <form>
          <div>
            <p>RATING:</p>
            {ratingText.map((currentRating, index)=>{
              return (
                <>
                  <input
                    type="radio"
                    name="rating"
                    value={(index + 1).toString()}
                    key={index}
                    checked={rating === (index + 1).toString()}
                    onChange={onRatingChange}
                  />
                  <label>{currentRating}</label>
                </>
              )
            })}
          </div>


          {isSize ?
            <div>
              <br></br>
              <p>SIZE:</p>
              {sizeText.map((currentSize, index)=>{
                return (
                  <>
                    <input
                      type="radio"
                      name="size"
                      value={(index + 1).toString()}
                      key={index}
                      checked={size === (index + 1).toString()}
                      onChange={onSizeChange}
                    />
                    <label>{currentSize}</label>
                  </>
                )
              })}
            </div>
            : <></>
          }

          {isWidth ?
          <div>
            <br></br>
            <p>WIDTH:</p>
            {widthText.map((currentWidth, index)=>{
              return (
                <>
                  <input
                    type="radio"
                    name="width"
                    value={(index + 1).toString()}
                    key={index}
                    checked={width === (index + 1).toString()}
                    onChange={onWidthChange}
                  />
                  <label>{currentWidth}</label>
                </>
              )
            })}
          </div>
          : <></>
          }

          {isComfort ?
          <div>
            <br></br>
            <p>COMFORT:</p>
            {comfortText.map((currentComfort, index)=>{
              return (
                <>
                  <input
                    type="radio"
                    name="comfort"
                    value={(index + 1).toString()}
                    key={index}
                    checked={comfort === (index + 1).toString()}
                    onChange={onComfortChange}
                  />
                  <label>{currentComfort}</label>
                </>
              )
            })}
          </div>
          : <></>
          }

          {isQuality ?
          <div>
            <br></br>
            <p>QUALITY:</p>
            {qualityText.map((currentQuality, index)=>{
              return (
                <>
                  <input
                    type="radio"
                    name="quality"
                    value={(index + 1).toString()}
                    key={index}
                    checked={quality === (index + 1).toString()}
                    onChange={onQualityChange}
                  />
                  <label>{currentQuality}</label>
                </>
              )
            })}
          </div>
          : <></>
          }

          {isLength ?
          <div>
            <br></br>
            <p>LENGTH:</p>
            {lengthText.map((currentLength, index)=>{
              return (
                <>
                  <input
                    type="radio"
                    name="length"
                    value={(index + 1).toString()}
                    key={index}
                    checked={length === (index + 1).toString()}
                    onChange={onLengthChange}
                  />
                  <label>{currentLength}</label>
                </>
              )
            })}
          </div>
          : <></>
          }

          {isFit ?
          <div>
            <br></br>
            <p>FIT:</p>
            {fitText.map((currentFit, index)=>{
              return (
                <>
                  <input
                    type="radio"
                    name="fit"
                    value={(index + 1).toString()}
                    key={index}
                    checked={fit === (index + 1).toString()}
                    onChange={onFitChange}
                  />
                  <label>{currentFit}</label>
                </>
              )
            })}
          </div>
          : <></>
          }

          <br></br>

          <p>Do you Recommend this Product?</p>
          <label>
            Yes
            <input name="recommend" type="radio" value="true" checked={recommend === "true"} onChange={onRecommendChange}/>
          </label>
          <label>
            No
            <input name="recommend" type="radio" value="false" checked={recommend === "false"} onChange={onRecommendChange}/>
          </label>
          <br></br>

          <br></br>
          <label>
            Summary:
          </label>
            <br></br>
            <input className="rr-summary-review-body" type="text" name="summary" value={reviewSummary} onChange={onReviewSummaryChange}/>

          <br></br>
          <label>
            Review:
          </label>
            <br></br>
            <input className="rr-form-review-body" type="text" name="review" value={reviewBody} onChange={onReviewBodyChange}/>

          <br></br>

          <label>
            What is your nickname:
            <input type="text" name="nickname" value={nickName} onChange={onNickNameChange}/>
          </label>
          <br></br>

          <label>
            Email:
            <input type="text" name="email" value={email} onChange={onEmailChange}/>
          </label>
          <br></br>

          <input type="submit" value="Submit"
          onClick={()=>{
            var charEntry = {}
            submitReview()

            if (size) {
              charEntry[characteristics.Size.id] = parseInt(size)
            }
            if (width) {
              charEntry[characteristics.Width.id] = parseInt(width)
            }
            if (comfort) {
              charEntry[characteristics.Comfort.id] = parseInt(comfort)
            }
            if (quality) {
              charEntry[characteristics.Quality.id] = parseInt(quality)
            }
            if (length) {
              charEntry[characteristics.Length.id] = parseInt(length)
            }
            if (fit) {
              charEntry[characteristics.Fit.id] = parseInt(fit)
            }
            var rec = recommend === true;
            console.log(rec)
            axios({
              method: 'post',
              url: 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews',
              headers: {
                'Authorization': process.env.REACT_APP_API_KEY,
              },
              data: {
                "product_id": id,
                "rating": parseInt(rating),
                "summary": reviewSummary.toString(),
                "body": reviewBody.toString(),
                "recommend": rec,
                "name": nickName.toString(),
                "email": email.toString(),
                "photos": [],
                "characteristics": charEntry
              }
            })
            .catch((error)=> console.log(error));


          }}/>

        </form>
      </div>
    </div>
  )
}

export default NewReviewForm