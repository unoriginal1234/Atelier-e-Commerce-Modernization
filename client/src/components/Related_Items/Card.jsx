import React from 'react';
import {useState, useEffect} from 'react';
import Comparison from './Comparison.jsx';
import { FaRegStar, FaStar } from "react-icons/fa";

const Card = function ({item, setID, type, clearIndex, pageData}) {
  //States
  const [currentCard, setCurrentCard] = useState(item.product.id);
  const [compare, setCompare] = useState(false);
  const [bothCategories, setBothCategories] = useState({fabric: {v1: 'cotton', v2: 'polyester'}})

  //Variable declaration to keep component dry
  let img_url = item.styles.results[0].photos[0].thumbnail_url || `https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg`;
  let preStarRatings = item.meta.ratings;
  let product = item.product;

  //On click functionality
  const changeID = function () {
    setID(currentCard);
    clearIndex();
  };
  const riAction = function () {
    setCompare(!compare);
  };
  const yoAction = function () {
    // deleteFunc(item);
  }

  //Feature maker
  const featureMaker = function () {

    if (pageData !== undefined && pageData !== null) {
      console.log(pageData);
      if (Object.keys(pageData).length !== 0) {
        let pageCategoriesObj = pageData;
        let newFeatures = item.product.features;
        for (var i = 0; i < newFeatures.length; i ++) {
          if (pageCategoriesObj[newFeatures[i].feature] !== undefined) {
            pageCategoriesObj[newFeatures[i].feature].v2 = newFeatures[i].value;
          } else {
            pageCategoriesObj[newFeatures[i].feature] = {v2: newFeatures[i].value || 'N/A'}
          }
        }
        setBothCategories(pageCategoriesObj);
      }
    }
  }

  useEffect (() => {
    featureMaker();
  }, [pageData])


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
      {compare && <Comparison bothCategories={bothCategories}/>}
      {/* {type.type === 'related' && <button className="r-i-secret-btn" onClick={riAction}>Compare</button>} */}
      {(type.type === 'related' && !compare)&& <div className="r-i-secret-btn" onClick={riAction}><FaRegStar /></div>}
      {(type.type === 'related' && compare)&& <div className="r-i-secret-btn" onClick={riAction}><FaStar /></div>}
      {type.type === 'outfit' && <button className="r-i-secret-btn" onClick={yoAction}>Delete</button>}
      <div onClick={changeID}>
      <img className="r-i-img" src={img_url}></img>
      <div className="r-i-cat">{product.category}</div>
      <div className="r-i-name">{product.name}</div>
      <div>{product.default_price}</div>
      </div>
      <div  className="Stars" style={{ '--rating': star }}></div>
    </div>
  )
};

export default Card;

//https://www.needpix.com/photo/1113016/
//https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg