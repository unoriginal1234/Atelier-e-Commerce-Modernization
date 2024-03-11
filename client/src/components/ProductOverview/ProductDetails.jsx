import React from 'react';
import ProductInformation from './ProductInformation.jsx';
import { FaFacebookSquare, FaPinterestSquare, FaCheck, FaHeart } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import Styles from './Styles.jsx';
import SelectOptions from './SelectOptions.jsx';
// import SloganDescFeat from './SloganDescFeat.jsx';
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const ProductDetails = ({ productData, reviewsData, onClickReadAllReviews, selectedStyle, stylesData, currentStyleId, handleStyleChange, errorMessages, selectOptionsProps, handleShareClick, handleAddToCart, isAddingToCart, availableQuantities, isLiked, handleLikeClick }) => {

  const ErrorMessages = ({ messages }) => (
    <div>
      {messages.map((message, index) => (
        <p key={index} style={{ color: '#F4493C' }}>{message}</p>
      ))}
    </div>
  );

  return (
    <div className="product-details-container">
      {/* Product Information component*/}
      <ProductInformation
        productData={productData}
        reviewsData={reviewsData}
        onClickReadAllReviews={onClickReadAllReviews}
        selectedStyle={selectedStyle}
      />
      {/* Social media sharing - Facebook, Twitter, Pinterest*/}
      <div className="social-media-sharing">
        Share <span className="social-media-icons">
          <FaFacebookSquare onClick={() => handleShareClick('Facebook')} />
          <FaSquareXTwitter onClick={() => handleShareClick('Twitter')} />
          <FaPinterestSquare onClick={() => handleShareClick('Pinterest')} />
        </span>
      </div>
      {/* Style Selector component- Thumbnails for each style */}
      <Styles
        styles={stylesData.results}
        currentStyleId={currentStyleId}
        handleStyleChange={handleStyleChange}
      />
      {/* Size, Quantity Selector component and error messages */}
      {errorMessages.length > 0 && <ErrorMessages messages={errorMessages} />}
      <SelectOptions {...selectOptionsProps} />
      {/* Add to Cart and like buttons */}
      <div className="add-to-cart-and-like">
        <button
          className="p-o-add-to-cart-button"
          onClick={handleAddToCart}
          disabled={isAddingToCart || availableQuantities <= 0}>
          {isAddingToCart ? (
            <AiOutlineLoading3Quarters className="rotate" />
          ) : (
            "ADD TO CART"
          )}
        </button>
        <button
          className="p-o-like-button"
          onClick={handleLikeClick}
          style={{ color: isLiked ? '#F4493C' : 'inherit' }}>
          <FaHeart style={{ fontSize: '20px' }} />
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
