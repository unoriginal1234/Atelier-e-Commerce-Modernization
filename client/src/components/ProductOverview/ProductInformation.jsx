// ProductInformation.jsx
import { useState } from 'react';

const ProductInformation = ({ productData, reviewsData, onClickReadAllReviews, selectedStyle }) => {

// Function click on 'Read all reviews' link
const handleClickReadAllReviews = (e) => {
  e.preventDefault();
  onClickReadAllReviews();
};

// Helper component to display rating stars and reviews link
const RatingStarsAndReviewsLink = (ratingsObj) => {
  // Calculation for average rating
  let totalRatings = 0;
  let totalStars = 0;
  for (let numberOfStars = 1; numberOfStars <= 5; numberOfStars++) {
    // number of ratings per stars
    const ratingsPerStars = Number(ratingsObj[numberOfStars] || 0);
    // number of stars per rating {2 star rating: 30 ratings} = 60 stars in total
    totalStars += numberOfStars * ratingsPerStars;
    totalRatings += ratingsPerStars;
  }
  const averageRating = totalRatings > 0 ? totalStars / totalRatings : 0;
  // console.log(totalStars, totalRatings, averageRating.toFixed(1));

  // Rendering stars div and link to reviews module
  return (
    <div className="Stars" style={{ "--rating": averageRating.toFixed(1) }}>
      <a href="#" onClick={handleClickReadAllReviews}>
        Read all {totalRatings} reviews
      </a>
    </div>
  );
};

return (
    <div className="product-information">
      {/* Star Rating - Read all reviews link*/}
      <div className="p-o-rating-stars-and-link-to-reviews">
        {RatingStarsAndReviewsLink(reviewsData.ratings)}
      </div>
      {/* Product Category */}
      <p>{productData.category}</p>
      {/* Product Title */}
      <h2 className="p-o-title">{productData.name}</h2>
      <div className="selected-style-name">
        Style > <b>{selectedStyle.name}</b>
      </div>
      {/* Price */}
      <div className="p-o-price">
        {selectedStyle.sale_price ? (
          <p>
            <span style={{ color: "#e35d6a" }}>
              <b> ${selectedStyle.sale_price} </b>
            </span>
            {selectedStyle.original_price && (
              <span style={{ color: "#a6b0b9", textDecoration: "line-through" }}>
                {" "}
                ${selectedStyle.original_price}
              </span>
            )}
          </p>
        ) : (
          <p>
            <b>${selectedStyle.original_price}</b>
          </p>
        )}
      </div>
      {/* Share on Social media */}
    </div>
  );
};
export default ProductInformation;

