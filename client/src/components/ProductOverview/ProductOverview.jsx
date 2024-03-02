//client/components/ProductOverview/ProductOverview.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Star from './Star.jsx';

const ProductOverview = ({id}) => {

const [data, setData] = useState(null);
const [stylesData, setStylesData] = useState(null);
const [reviewsData, setReviewsData] = useState(null);

const [selectedStyle, setSelectedStyle] = useState(null);
const [availableSizes, setAvailableSizes] = useState([]);
const [quantity, setQuantity] = useState([]);

// Event handler to update selected style and available sizes
const handleStyleChange = (styleId) => {
  const selected = stylesData.results.find(style => style.style_id === styleId);
  setSelectedStyle(selected);
  setAvailableSizes(Object.values(selected.skus).map(sku => sku.size));
  setQuantity(Object.values(selected.skus).map(sku => sku.quantity));
};

const fetchData = (endpoint, setData) => {
  const options = {
    headers: {
      'Authorization': `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`,
      //  'contentType': 'application/json',
      //  'type': 'GET'
    }
  };
  axios.get(endpoint, options)
    .then(response => {
      setData(response.data);
      // console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
};

// useEffect to fetch the data
useEffect(() => {
  fetchData(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${id}`, setData);
  fetchData(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${id}/styles`, setStylesData);
  fetchData(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews/meta/?product_id=${id}`, setReviewsData);
}, [id]);


if (!data || !stylesData || !reviewsData) {
  return <div>Loading...</div>;
}
// get total number of reviews
const getNumberOfReviews = (ratings) => {
  let totalReviews = 0;
  for (let rating in ratings) {
    totalReviews += parseInt(ratings[rating]);
  }
  return totalReviews;
};

// function to display rating stars
const displayRatings = (ratings) => {
  const stars = [];
  let totalRatings = 0;
  let totalScore = 0;
  // Calculate total score and total number of ratings
  for (let rating = 1; rating <= 5; rating++) {
    const count = parseInt(ratings[rating] || 0);
    totalScore += rating * count;
    totalRatings += count;
  }
  // Calculate average rating
  const averageRating = totalRatings > 0 ? totalScore / totalRatings : 0;
  for (let rating = 1; rating <= 5; rating++) {
    const filled = rating <= averageRating;
    // get the Stars component
    stars.push(<Star key={rating} filled={filled} size={14} />);
  }
  return stars;
};

const totalReviews = getNumberOfReviews(reviewsData.ratings);


return (
  <div className="product-overview">
    <div className="p-o-left">
      {/* Product Images */}
    </div>

    <div className="p-o-right">
      {/* Product Information */}
      <div className="product-info">
      {totalReviews > 0 && (
      <div className="rating">
        {displayRatings(reviewsData.ratings)}
        <a href="#"> Read all {totalReviews} reviews</a>
      </div>
    )}
    </div>
  </div>
  </div>
);
};

export default ProductOverview;