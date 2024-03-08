import React from 'react';
import {useState, useEffect} from 'react';
import Comparison from './Comparison.jsx';
import StyleSlide from './StyleSlide.jsx';
import { FaRegStar, FaStar } from "react-icons/fa";
import { IoIosCloseCircleOutline, IoIosCloseCircle } from "react-icons/io";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

const Card = function ({item, setID, type, clearIndex, pageData, deleteOutfitItem}) {

  //States
  const [currentCard, setCurrentCard] = useState(item.product.id);
  const [compare, setCompare] = useState(false);
  const [bothCategories, setBothCategories] = useState({fabric: {v1: 'cotton', v2: 'polyester'}});
  const [deleteHover, setDeleteHover] = useState(false);
  const [currentStylePic, setCurrentStylePic] = useState(item.styles.results[0].photos[0].thumbnail_url || `https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg`);

  //Style Carousel
  const [styles, setStyles] = useState(item.styles.results.slice(1));
  const [firstThumbnailIndex, setFirstThubmnailIndex] = useState(0);
  const [lastThumbnailIndex, setLastThumbnailIndex] = useState(3);
  const [styleCarousel, setStyleCarousel] = useState(false);

  //Image in-line css
  const image = {
    backgroundImage: `url(${currentStylePic})`,
  }

  //Variable declaration to keep component dry
  let img_url = item.styles.results[0].photos[0].thumbnail_url || `https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg`;
  let preStarRatings = item.meta.ratings;
  let product = item.product;

  //On click functionality
  const changeID = function () {
    setID(currentCard);
    if (typeof clearIndex === 'function') {
      clearIndex();
    }
  };
  const riAction = function () {
    setCompare(!compare);
  };
  const yoAction = function () {
    deleteOutfitItem(item);
  }

  //Carousel click functions --------------------------

  //Clicking carousel arrows
  const onLeftClick = function () {
    if (firstThumbnailIndex > 0) {
      setFirstThubmnailIndex(firstThumbnailIndex - 1);
      setLastThumbnailIndex(lastThumbnailIndex - 1);
    }
  };
  const onRightClick = function () {
    if (styles.length - 1 > lastThumbnailIndex) {
      setFirstThubmnailIndex(firstThumbnailIndex + 1);
      setLastThumbnailIndex(lastThumbnailIndex + 1);
    }
  };

  //Clicking tumbnail carousel img
  const thumbClick = function (url) {
    setCurrentStylePic(url);
  }

  //Feature maker
  const featureMaker = function () {

    if (pageData !== undefined && pageData !== null) {
      if (Object.keys(pageData).length !== 0) {
        let pageCategoriesObj = JSON.parse(JSON.stringify(pageData));
        let newFeatures = item.product.features;
        pageCategoriesObj['Product Name'].v2 = item.product.name;
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
      {(type.type === 'related' && !compare)&& <div title="action" className="r-i-secret-btn" onClick={riAction}><FaRegStar title="r-i-empty-star"/></div>}
      {(type.type === 'related' && compare)&& <div title="action" className="r-i-secret-btn" onClick={riAction}><FaStar /></div>}
      {type.type === 'outfit' && <div className="r-i-secret-btn" onMouseEnter={()=> setDeleteHover(true)} onMouseLeave={()=> setDeleteHover(false)} onClick={yoAction}>
        {deleteHover && <IoIosCloseCircle />}
        {!deleteHover && <IoIosCloseCircleOutline />}
      </div>}
        <div onMouseEnter={() => setStyleCarousel(true)} onMouseLeave={() => setStyleCarousel(true)}>
          {/* <div className="r-i-img-holder"><img onMouseEnter={() => setStyleCarousel(true)} className="r-i-img" onClick={changeID} src={currentStylePic}></img></div> */}
          <div className="r-i-img-size"><div onClick={changeID} className="r-i-img" title="r-i-image" style={image}></div></div>
          {styleCarousel && <div className="r-i-style-thumbs">
            {styles.length !== 0 && <BsChevronCompactLeft onClick={onLeftClick} className="r-i-style-carousel-left"/>}
            {styles.map((style, index) => {
              if (styles.indexOf(style) >= firstThumbnailIndex && styles.indexOf(style) <= lastThumbnailIndex) {
                return <StyleSlide key={index} change={thumbClick} style={style}/>
              }
            })}
            <BsChevronCompactRight onClick={onRightClick} className="r-i-style-carousel-right"/>
          </div>}
        </div>
      <div onClick={changeID}>
        <div className="r-i-cat" title="r-i-cat">{product.category}</div>
        <div className="r-i-name" title="r-i-name">{product.name}</div>
        {item.styles.results[0].sale_price === null && <div title="r-i-price">{product.default_price}</div>}
        {item.styles.results[0].sale_price !== null && <div><p className="r-i-sale">{item.styles.results[0].sale_price}</p><p><s>{product.default_price}</s></p></div>}
        <div  className="Stars" title="r-i-stars" style={{ '--rating': star }}></div>
      </div>
    </div>
  )
};

export default Card;

//https://www.needpix.com/photo/1113016/
//https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg