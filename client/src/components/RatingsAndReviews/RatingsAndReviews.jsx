import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';
import ReviewsList from './ReviewsList.jsx';
import axios from 'axios';
import ReviewBreakdown from './ReviewBreakdown.jsx';
import Sort from './Sort.jsx';
import AddReview from './AddReview.jsx';
import SeeMore from './SeeMore.jsx';
import NewReviewForm from './NewReviewForm.jsx'



const RatingsAndReviews = forwardRef(({ id }, ref) => {
  const ratingsAndReviewsRef = useRef(null);

  // Expose a function to trigger scrolling
  useImperativeHandle(ref, () => ({
    scrollToRatingsAndReviews: () => {
      ratingsAndReviewsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }));

  const [ reviews, setReviews ] = useState([]);
  const [ reviewsMeta, setReviewsMeta ] = useState([]);
  const [ isReviewing, setIsReviewing ] = useState(false);
  const [ moreReviews, setMoreReviews ] = useState(4);
  const [ totalReviews, setTotalReviews ] = useState(0);
  const [ sort, setSort ] = useState('relevant');
  const [ filteredResults, setFilteredResults ] = useState([])

  // Headers for API calls
  const options = {
    headers: {
      'Authorization': `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`,
    }
  };

  // Initial and whenever the ID changes
  useEffect(() => {fetchData();}, [id]);
  useEffect(() => {sortData();}, [sort]);

  //API Calls
  const fetchData = () => {
    Promise.all([
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews/?product_id=${id}`, options),
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews/meta/?product_id=${id}`, options)
    ])
    .then(([reviewResponse, metaResponse]) => {
      // right now hard coding the limited response
      setTotalReviews(reviewResponse.data.results.length)
      setFilteredResults(reviewResponse.data.results)
      setReviews(reviewResponse.data.results.slice(0, 2));
      // console.log(reviewResponse.data, '-- review Response');
      setReviewsMeta(metaResponse.data)
      console.log(metaResponse.data, '--meta Response');
    })
    .catch(error => {
      console.error('Error fetching data:', error);
  // fake data
      // setData(product[0]);
      // setStylesData(styles);
      // setReviewsData(reviews);
    });
  };

  const fetchMore = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews?sort=${sort}&product_id=${id}`, options)
    .then((reviewResponse)=> {setReviews(reviewResponse.data.results.slice(0, moreReviews))})
    .then(()=>setMoreReviews(moreReviews + 2))
    .catch((error)=>console.error('Error fetching data: ', error));
  }

  const sortData = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews?sort=${sort}&product_id=${id}`, options)
    .then((reviewResponse) => {
      setReviews(reviewResponse.data.results.slice(0, 2));
    })
    .then(()=>setMoreReviews(4))
    .catch((error) => {
      console.error('Error fetching data:', error);
    })
  };

  const filterData = (rating) => {
    // console.log(filteredResults, 'filtered results')
    const pizza = filteredResults.filter((review)=>review.rating === rating)
    // console.log(pizza, 'pizza')
    setReviews(pizza)
  }


  // console.log(reviews, '-- Reviews data from API call');

  //Handlers
  const addReviewClickHandler = () => {
    // console.log('click');
    setIsReviewing(true);
  }

  const submitReview = () => {
    event.preventDefault();
    setIsReviewing(false);
  }

  const sortHandler = (value) => {
    setSort(value);
  }

  const filterHandler = (rating) => {
    filterData(rating);
  }

  //RENDER

  if (isReviewing) {
    return (
      <NewReviewForm submitReview={submitReview}/>
    )
  }

  return (
    <div>
      <h5  ref={ratingsAndReviewsRef}>Ratings and Reviews</h5>
      <Sort totalReviews={totalReviews} sortHandler={sortHandler}/>
      <div className="rr-container">
        <ReviewBreakdown reviewsMeta={reviewsMeta} filterHandler={filterHandler}/>
        <ReviewsList reviews={reviews}/>
      </div>
      <AddReview addReviewClickHandler={addReviewClickHandler}/>
      {moreReviews < totalReviews + 2 ? <SeeMore fetchMore={fetchMore}/> : ""}
    </div>
  )
});

export default RatingsAndReviews;