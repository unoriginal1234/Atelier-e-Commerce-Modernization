import React from 'react';
import {useState} from 'react';
import Comparison from './Comparison.jsx';

const Card = function ({item, setID, type}) {
  //States
  const [currentCard, setCurrentCard] = useState(item.product.id);
  const [compare, setCompare] = useState(false);


  //Variable declaration to keep component dry
  let img_url = item.styles.results[0].photos[0].thumbnail_url || `https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg`;
  let preStarRatings = item.meta.ratings;
  let product = item.product;

  //On click functionality
  const changeID = function () {
    setID(currentCard);
  };
  const riAction = function () {
    setCompare(!compare);
  };
  const yoAction = function () {
  }

  //Rating maker
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

  //Component return
  return (
    <div className="r-i-card">
      {compare && <Comparison />}
      {type.type === 'related' && <button className="r-i-secret-btn" onClick={riAction}>Compare</button>}
      {type.type === 'outfit' && <button className="r-i-secret-btn" onClick={yoAction}>Delete</button>}
      <div onClick={changeID}>
      <img className="r-i-img" src={img_url}></img>
      <div>{product.category}</div>
      <div>{product.name}</div>
      <div>{product.default_price}</div>
      </div>
      <div  className="Stars" style={{ '--rating': star }}></div>
    </div>
  )
};

export default Card;

//https://www.needpix.com/photo/1113016/
//https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg