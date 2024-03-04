import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageGallery from './ImageGallery.jsx';
import { product, styles, reviews } from './exampleData.js';
import Styles from './Styles.jsx'; // Import the Styles component

const ProductOverview = ({ id }) => {
  const [data, setData] = useState(null);
  const [stylesData, setStylesData] = useState(null);
  const [reviewsData, setReviewsData] = useState(null);
  const [currentStyleId, setCurrentStyleId] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [quantity, setQuantity] = useState(0); // Initialize as 0 or another appropriate default value
  const [currentImage, setCurrentImage] = useState('');

  // Define state variables for selected size and quantity
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    const fetchData = () => {
      const options = {
        headers: {
          'Authorization': `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`,
        }
      };
      Promise.all([
        axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${id}`, options),
        axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${id}/styles`, options),
        axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews/meta/?product_id=${id}`, options)
      ])
      .then(([productResponse, stylesResponse, reviewsResponse]) => {
        setData(productResponse.data);
        setStylesData(stylesResponse.data);
        setReviewsData(reviewsResponse.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
    // fake data
        setData(product[0]);
        setStylesData(styles);
        setReviewsData(reviews);
      });
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
      setCurrentImage(selected.photos[0].url); // Set default image for the new style
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
  const RatingStarsAndReviewsLink = (ratings, totalReviews) => {
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
    // return rating stars and number of reviews link;
    return (
    <div className="Stars" style={{ '--rating': averageRating }}>
    <a href="#"> Read all {totalReviews} reviews</a></div>
    );
  };

  const totalReviews = reviewsData ? getNumberOfReviews(reviewsData.ratings) : 0;

  // Function to handle Thumbnail Click click
  const handleThumbnailClick = (imageUrl) => {
    setCurrentImage(imageUrl);
  };


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

  // Render Loading message if data is being fetched
  if (!data || !stylesData || !reviewsData) {
    return <div>Loading...</div>;
  // console.log(data[0], stylesData, reviewsData);
  }


  return (
    <div className="product-overview">
      {/* Left div to hold the current product SKU gallery images */}
      <div className="p-o-left">
      {/* {selectedStyle && <ImageGallery selectedStyle={selectedStyle} currentStyleId={currentStyleId} />} */}

        {/* <div className="gallery-images-conteiner">
          <img src={currentImage} alt="Product" />
          <div className="navigation-thumnails-conteiner">
            {selectedStyle && selectedStyle.photos.map((photo, index) => (
              <img
                key={index}
                src={photo.thumbnail_url}
                alt={`Thumbnail ${index}`}
                onClick={() => handleThumbnailClick(photo.url)}
              />
            ))}
          </div>
        </div> */}
      </div>

      {/* Product Information right div*/}
      <div className="p-o-right">
        <div className="product-info">
          {/* Display rating stars and number of reviews if any */}
          {totalReviews > 0 && (
            <div className="product p-o-ratings-reviews">
  {/* displayRatings displays 5 stars filled according to the average rating score.*/}

  {RatingStarsAndReviewsLink(reviewsData.ratings, totalReviews)}
       </div>
          )}
          {/* Display category */}
          <div className="product category">
            <p>{data.category}</p>
          </div>
          {/* Display product title/name */}
          <div className="product title">
            <h2 className="p-o-title">{data.name}</h2>
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
          {/* Displays the name of the selected style */}
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
               {/* 1.1.3.2. Quantity Selector: "The maximum selection for quantity will be capped by either the quantity of this style and size in stock, or a hard limit of 15." */}
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
            {/* Like button - Not required but i'll be nice to implement it*/}
            <button className="like-button">⭐</button>
            {/* <button className="like-button"><Star key={11} filled={true} size={16} /></button> */}

          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductOverview;
