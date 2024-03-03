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
  const [quantity, setQuantity] = useState(0); // Initialize as 0 or another appropriate default value

  // Define state variables for selected size and quantity
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  // Fetch data useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          headers: {
            'Authorization': `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`,
          }
        };
        const [productResponse, stylesResponse, reviewsResponse] = await Promise.all([
          axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${id}`, options),
          axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${id}/styles`, options),
          axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews/meta/?product_id=${id}`, options)
        ]);
        setData(productResponse.data);
        setStylesData(stylesResponse.data);
        setReviewsData(reviewsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  // useEffect to set default style id
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

      // Handle cases where quantity is not available or skus is empty
      const quantities = Object.values(selected.skus).map(sku => sku.quantity);
      const totalQuantity = quantities.length > 0 ? Math.min(...quantities) : 0;
      setQuantity(totalQuantity);

      setCurrentStyleId(styleId); // Update current style id
    }
  };

  // Function to get total number of reviews
  const getNumberOfReviews = (ratings) => {
    let totalReviews = 0;
    for (let rating in ratings) {
      totalReviews += parseInt(ratings[rating]);
    }
    return totalReviews;
  };

  // Function to display rating stars
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

  // Function to handle Add to Cart button click
  const handleAddToCart = () => {
    if (selectedSize === 'Select Size') {
      // If 'Select Size' is selected, open the size dropdown and display a message
      alert('Please select size');
    } else if (selectedQuantity <= 0) {
      // If quantity is invalid, display an error message
      alert('Please select a valid quantity');
    } else {
      // Add product to cart with selected size and quantity
      // Implement your logic to add the product to the cart
      alert(`Adding ${selectedQuantity} of size ${selectedSize} to cart`);
    }
  };

  return (
    <div className="product-overview">
      {/* Div to hold the Product Gallery */}
      <div className="p-o-left">
        {/* Product images div conteiner */}
        <div className="gallery-images-conteiner">
        <div className="navigation-thumnails-conteiner">
        </div>
      </div>
      </div>

      {/* Product Information */}
      <div className="p-o-right">
        <div className="product-info">
          {/* Rating/stars and number of reviews if any */}
          {totalReviews > 0 && (
            <div className="product p-o-ratings-reviews">
              {displayRatings(reviewsData.ratings)}
              <a href="#"> Read all {totalReviews} reviews</a>
            </div>
          )}
          {/* Category */}
          <div className="product category">
            <p>{data && data.category}</p>
          </div>
          {/* Title/Name */}
          <div className="product title">
            <h2 className="p-o-title">{data && data.name}</h2>
          </div>
          {/* Price */}
          <div className="product price">
            {/* Display current style price */}
            {selectedStyle && (
              <>
                {selectedStyle.sale_price ? ( // Check if there is a sale price
                  <p>
                    <span style={{ color: "red" }}> ${selectedStyle.sale_price} </span>
                    {selectedStyle.original_price && ( // Check if there is an original price
                      <span style={{ textDecoration: "line-through" }}> ${selectedStyle.original_price}</span>
                    )}
                  </p>
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
              Style > <b>{selectedStyle.name}</b>
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

          {/* Size and Quantity selector*/}
          <div className="product size-and-quantity">
            <select
              className="size-select"
              disabled={!availableSizes.length} // Disable if no sizes available
              defaultValue={availableSizes.length ? 'Select Size' : 'OUT OF STOCK'} // Default value based on availability
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option key="default">Select Size</option>
              {availableSizes.map((size, i) => (
                <option key={`size-${size}-${i}`}>{size}</option> // Improved key with size value
              ))}
            </select>
            <select
              className="quantity-select"
              disabled={!availableSizes.length} // Disable if no sizes available
              defaultValue={availableSizes.length ? 1 : '-'} // Default value based on size selection
              onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}
            >
              {[...Array(Math.min(quantity, 15)).keys()].map((num) => (
                <option key={`quantity-${num + 1}`} value={num + 1}>{num + 1}</option> // Improved key with quantity value
              ))}
            </select>
          </div>

          {/* Add to Cart button */}
          <div className="product add-to-cart-and-like">
            <button className="add-to-cart-button" onClick={handleAddToCart}>
              Add to Cart
              {/* <span>Add to Cart</span><span>+</span> */}
            </button>
            {/* Like button */}
            <button className="like-button">⭐</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
