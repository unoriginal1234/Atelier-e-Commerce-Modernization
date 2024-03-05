import React from 'react';

// TO DO: Need to get from the page on click the Characteristic Fields

const NewReviewForm = ({submitReview}) => {
  return (
    <div>
      <h3>Write Your Review</h3>
      <h4>About the ____</h4>
      <div>
        <form>

          <label>
          1 - "Poor"
            <input type="radio" value="1" checked={true}/>
          </label>
          <label>
          2 - "Fair"
            <input type="radio" value="1" checked={false}/>
          </label>
          <label>
          3 - "Average"
            <input type="radio" value="1" checked={false}/>
          </label>
          <label>
          4 - "Good"
            <input type="radio" value="1" checked={false}/>
          </label>
          <label>
          5 - "Great"
            <input type="radio" value="1" checked={false}/>
          </label>
          <br></br>

          <p>Do you Recommend this Product?</p>
          <label>
            Yes
            <input type="radio" value="Yes" checked={true}/>
          </label>
          <label>
            No
            <input type="radio" value="No" checked={false}/>
          </label>
          <br></br>

          <label>
            Review:
            <input type="text" name="name" />
          </label>
          <br></br>

          <label>
            What is your nickname:
            <input type="text" name="nickname" />
          </label>
          <br></br>

          <label>
            Email:
            <input type="text" name="email" />
          </label>
          <br></br>

          <input type="submit" value="Submit" onClick={submitReview}/>

        </form>
      </div>
    </div>
  )
}

export default NewReviewForm