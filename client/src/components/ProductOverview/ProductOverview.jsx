// client/components/ProductOverview/ProductOverview.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Star from './Star.jsx';
import Styles from './Styles.jsx'; // Import the Styles component

const ProductOverview = ({ id }) => {
  const [data, setData] = useState(null);
  const [stylesData, setStylesData] = useState(null);
  const [reviewsData, setReviewsData] = useState(null);
  const [currentStyleId, setCurrentStyleId] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [quantity, setQuantity] = useState([]);

  const fetchData = (endpoint, setData) => {
    const options = {
      headers: {
        'Authorization': `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`,
      }
    };
    axios.get(endpoint, options)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${id}`, setData);
    fetchData(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${id}/styles`, setStylesData);
    fetchData(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews/meta/?product_id=${id}`, setReviewsData);
  }, [id]);

  useEffect(() => {
    if (stylesData) {
      setCurrentStyleId(stylesData.results[0].style_id); // Set default style id
    }
  }, [stylesData]);

  // Event handler to update selected style and available sizes
  const handleStyleChange = (styleId) => {
    if (styleId !== currentStyleId) {
      const selected = stylesData.results.find(style => style.style_id === styleId);
      setSelectedStyle(selected);
      setAvailableSizes(Object.values(selected.skus).map(sku => sku.size));
      setQuantity(Object.values(selected.skus).map(sku => sku.quantity));
      setCurrentStyleId(styleId); // Update current style id
    }
  };

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
      stars.push(<Star key={rating} filled={filled} size={16} />);
    }
    return stars;
  };

  const totalReviews = reviewsData ? getNumberOfReviews(reviewsData.ratings) : 0;

  return (
    <div className="product-overview">
      {/* Product Gallery */}
      <div className="p-o-left">
        {/* Product Images */}
      </div>

      {/* Product Information. It's a fucking organized mess 😬*/}
      <div className="p-o-right">
        <div className="product-info">
          {/* Rating/stars and number of reviews if any */}
          {totalReviews > 0 && (
            <div className="product ratings-reviews">
              {displayRatings(reviewsData.ratings)}
              <a href="#"> Read all {totalReviews} reviews</a>
            </div>
          )}
          {/* Category */}
          <div className="product category">
            {data && data.category}
          </div>
          {/* Title/Name */}
          <div className="product title">
            <h3>{data && data.name}</h3>
          </div>
          {/* Price */}
          <div className="product price">
          {/* Display current style price */}
          {selectedStyle && (
            <>
              {selectedStyle.sale_price ? ( // Check if there is a sale price
                <>
                  <span style={{ color: "red" }}> ${selectedStyle.sale_price} </span>
                  {selectedStyle.original_price && ( // Check if there is an original price
                    <span style={{ textDecoration: "line-through" }}> ${selectedStyle.original_price}</span>
                  )}
                </>
              ) : (
                // If there is no sale price, display the original price
                <p>${selectedStyle.original_price}</p>
              )}
            </>
          )}
          </div>
          {/* Display the name of the selected style */}
          {selectedStyle && (
            <div className="selected-style">
              <p>Style > <b>{selectedStyle.name}</b></p>
            </div>
          )}
          {/* Render Styles component */}
          {stylesData && (
            <Styles
              styles={stylesData.results}
              currentStyleId={currentStyleId}
              setCurrentStyleId={handleStyleChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
