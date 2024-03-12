import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';
import ReviewsList from './ReviewsList.jsx';
import axios from 'axios';
import ReviewBreakdown from './ReviewBreakdown.jsx';
import Sort from './Sort.jsx';
import AddReview from './AddReview.jsx';
import SeeMore from './SeeMore.jsx';
import NewReviewForm from './NewReviewForm.jsx'
import { createPortal } from 'react-dom'

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
  const [ characteristics, setCharacteristics ] = useState({})
  const [ filterList, setFilterList ] = useState([])

  const [showModal, setShowModal] = useState(false);

  // Headers for API calls
  const options = {
    headers: {
      'Authorization': process.env.REACT_APP_API_KEY,
    }
  };

  // Initial and whenever the ID changes
  useEffect(() => {fetchData();}, [id]);
  useEffect(() => {sortData();}, [sort]);

  useEffect(()=> {
    filterList.length === 0 ? setReviews(filteredResults.slice(0, 2)) :
    setReviews(filteredResults.filter((review)=> filterList.includes(review.rating)))
  }, [filterList])

  useEffect(() => {
    if (filterList.length === 0) {
      setReviews(filteredResults.slice(0, 2))
    } else {
      setReviews(filteredResults.filter((review)=> filterList.includes(review.rating)));
    }
  }, [filteredResults])


  //API Calls
  const fetchData = () => {
    Promise.all([
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews/?product_id=${id}&count=100`, options),
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews/meta/?product_id=${id}`, options)
    ])
    .then(([reviewResponse, metaResponse]) => {
      setTotalReviews(reviewResponse.data.results.length)
      setFilteredResults(reviewResponse.data.results)
      setReviewsMeta(metaResponse.data)
      setCharacteristics(metaResponse.data.characteristics)
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  };

  const fetchMore = () => {
    setReviews(filteredResults.slice(0, moreReviews))
    setMoreReviews(moreReviews + 2)
  }

  const sortData = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews?sort=${sort}&product_id=${id}&count=100`, options)
    .then((reviewResponse) => {
      setFilteredResults(reviewResponse.data.results)
    })
    .then(()=>setMoreReviews(4))
    .catch((error) => {
      console.error('Error fetching data:', error);
    })
  };

  const filterData = (rating) => {
    // console.log(filteredResults, 'filtered results')
    if (filterList.indexOf(rating) > -1) {
      let newFilterList = filterList.slice(0, filterList.indexOf(rating)).concat(filterList.slice(filterList.indexOf(rating) + 1))
      //TO DO: check if
      setFilterList(newFilterList)
    } else {
      let newFilterList = filterList.slice()
      newFilterList.push(rating);
      setFilterList(newFilterList)
    }
  }

  //Handlers
  const addReviewClickHandler = () => {
    setShowModal(true)
  }

  const submitReview = () => {
    event.preventDefault();
    setShowModal(false)
  }

  const sortHandler = (value) => {
    setSort(value);
  }

  const filterHandler = (rating) => {
    filterData(rating);
  }

  //RENDER
  return (

    <div>

      {showModal && createPortal(
        <div className="rr-modal-container">
        <NewReviewForm submitReview={submitReview} characteristics={characteristics} id={id}/>
      </div>, document.body) }

      <h5  ref={ratingsAndReviewsRef}>Ratings and Reviews</h5>

      <div className="rr-container">
        <ReviewBreakdown reviewsMeta={reviewsMeta} filterHandler={filterHandler}/>
        <div>
          <Sort totalReviews={totalReviews} sortHandler={sortHandler}/>
          <ReviewsList reviews={reviews}/>
          <div className="rr-container">
            <AddReview addReviewClickHandler={addReviewClickHandler}/>
            {moreReviews < totalReviews + 2 ? <SeeMore fetchMore={fetchMore}/> : ""}
          </div>
        </div>
      </div>

    </div>
  )
});

export default RatingsAndReviews;