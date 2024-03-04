import React from 'react';
import {useState} from 'react';

const Card = function ({item, setID}) {
  const [currentCard, setCurrentCard] = useState(item.product.id);

  let img_url = item.styles.results[0].photos[0].thumbnail_url || `https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg`;
  let preStarRatings = item.meta.ratings;
  let product = item.product;

  const changeID = function () {
    setID(currentCard);
  }

  const setRating = function() {
    let reviewNumber = 0;
    let reviewWeight = 0;
    for (var key in preStarRatings) {
      reviewNumber += Number(preStarRatings[key]);
      reviewWeight += (preStarRatings[key] * key);
    }
    return reviewWeight / reviewNumber;
  }

  let star = setRating()

  return (
    <div onClick={changeID} className="r-i-card">
      <button>Action Button</button>
      <img className="r-i-img" src={img_url}></img>
      <div>{product.category}</div>
      <div>{product.name}</div>
      <div>{product.default_price}</div>
      <div  className="Stars" style={{ '--rating': star }}></div>
    </div>
  )
};

export default Card;

//https://www.needpix.com/photo/1113016/
//https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg