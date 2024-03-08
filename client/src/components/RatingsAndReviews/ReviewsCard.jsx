import React from 'react';
const {useState, useEffect} = React;
import axios from 'axios';
import { FaCheckCircle } from "react-icons/fa";
import AnswerImageItem from '../QuestionsAndAnswers/AnswerImageItem.jsx'


//TODO: review.photos
// Recommend checkmark

const ReviewsCard = ({review}) => {

  const options = {
    headers: {
      'Authorization': process.env.REACT_APP_API_KEY,
    }
  };

  useEffect(()=> {setHasSetHelpfulness(false)
    setHasReported(false)}, [review])

  const [ hasSetHelpfulness, setHasSetHelpfulness ] = useState(false)
  const [ hasReported, setHasReported ] = useState(false)

  // console.log(review, 'review')

  const [reviewHelpful, setReviewHelpful] = useState(review.helpfulness);

  const date = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const dateItem = new Date(review.date);
  const formatDate = new Intl.DateTimeFormat('en-US',date);
  const finalDate = formatDate.format(dateItem);

  const handleYes = () => {
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews/${review.review_id}/helpful`, null , options)
      .then(() => {
        console.log("Successfully updated helpfulness")
      })
      .then(()=> setHasSetHelpfulness(true))
      .catch((err) => {
        console.error("Error adding helpfulness count", err);
      })
  }

  const handleReport = () => {
    axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews/${review.review_id}/report`, null , options)
      .then(() => {
        console.log("Successfully reported")
      })
      .then(()=> setHasReported(true))
      .catch((err) => {
        console.error("Error reporting", err);
      })
  }

  return (
    <div className="rr-card">
      <div className="rr-stars-and-checks">
        <div className="Stars" style={{ '--rating': review.rating }}></div>
        <div className="rr-card-name">
          {review.recommend ? <FaCheckCircle /> : ""}
          <p>{review.reviewer_name}</p>
        </div>
      </div>

      <p className="rr-summary">{review.summary}</p>

      <p className="rr-body">{review.body}</p>

      {/* <div className="rr-picture-thumbnails">
        {review.photos ? review.photos.map((photo, index) => {
          return <img key={index} className="rr-photo" src={photo.url}/>
        }) : ""}
      </div> */}
      <div className="answer-images-container">
          {review.photos.map(photo => {
            return <AnswerImageItem key={photo.id} answer={review} photo={photo} />
          })}
      </div>

      {review.response ? <p className="rr-response">Response: {review.response}</p> : ""}
        <div className="rr-card-footer">
          <p>{finalDate}</p>
          <div className="rr-help-and-report">
            {!hasSetHelpfulness ?
              <div> <div>Helpful?</div><span onClick={handleYes} className="yes-answer-button report-button">Yes</span> ({reviewHelpful})</div>
              : <div><span className="yes-answer-button report-button">Yes</span> ({reviewHelpful + 1})</div>}

              {!hasReported ?
              <div> <div className="rr-report-button" onClick={handleReport}>Report?</div></div>
              : <span className="rr-report-button" style={{"textDecoration": "none", "color": "red"}}>Reported</span>}

          </div>
        </div>
    </div>
  )
}

export default ReviewsCard