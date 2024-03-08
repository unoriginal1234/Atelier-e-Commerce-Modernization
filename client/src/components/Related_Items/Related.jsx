import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card.jsx';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Related = function (props) {
  const [relatedIDs, setRelatedIDs] = useState([]);
  const [relatedItems, setRelatedItems] = useState(null);
  const [yourOutfit, setYourOutfit] = useState([]);
  const [currentItemsIndex, setCurrentItemsIndex] = useState(0);
  const [lastItemIndex, setLastItemIndex] = useState(3);
  const [firstOutfitIndex, setFirstOutfitIndex] = useState(0);
  const [lastOutfitIndex, setLastOutfitIndex] = useState(2);
  const [pageData, setPageData] = useState({});
  const [pageCategories, setPageCategories] = useState(null) //f1: {v1: val1, v2: val2}

  //Type objects
  let outfit = {type: 'outfit'};
  let related = {type: 'related'};

  //Testing function onClick
  const onClick = function () {
    console.log('related items obj =', relatedItems, 'related items array =', relatedIDs);
  }

  //Clearing index function
  const clearIndex = function () {
    setCurrentItemsIndex(0);
    setLastItemIndex(3);
  }

  //Related ccarousel left and right buttons
  const onLeftClick = function () {
    if (currentItemsIndex > 0) {
      setCurrentItemsIndex(currentItemsIndex - 1);
      setLastItemIndex(lastItemIndex - 1);
    }
  };
  const onRightClick = function () {
    if (relatedItems.length - 1 > lastItemIndex) {
      setCurrentItemsIndex(currentItemsIndex + 1);
      setLastItemIndex(lastItemIndex + 1);
    }
  };

  //Your Outfit carousel left and right
  const onYOLeftClick = function () {
    if (firstOutfitIndex > 0) {
      setFirstOutfitIndex(firstOutfitIndex - 1);
      setLastOutfitIndex(lastOutfitIndex - 1);
    }
  };
  const onYORightClick = function () {
    if (yourOutfit.length - 1 > lastOutfitIndex) {
      setFirstOutfitIndex(firstOutfitIndex + 1);
      setLastOutfitIndex(lastOutfitIndex + 1);
    }
  };

  //Add to outfit function
  const addToOutfit = function () {
    let item = {product: pageData};
    let oldOutfit = yourOutfit.slice();
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews/meta/?product_id=${props.id}`, options)
      .then((response) => {
        item.meta = response.data;
        return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${props.id}/styles`, options);
      })
      .then((response) => {
        item.styles = response.data;
        oldOutfit.push(item);
        setYourOutfit(oldOutfit);
      })
      .catch((err) => {
        console.error('Error adding to outfit', err);
      })
  };

  //Get rid of an outfit function
  const deleteOutfitItem = function (item) {
    let index = yourOutfit.indexOf(item);
    let newOutfit = yourOutfit.slice(0,index).concat(yourOutfit.slice(index+1));
    setYourOutfit(newOutfit);
    if (lastOutfitIndex > 2 && lastOutfitIndex >= newOutfit.length) {
      setLastOutfitIndex(newOutfit.length-1);
      setFirstOutfitIndex(newOutfit.length-3);
    }
  }



  //API object
  const options = {
    headers: {
      'Authorization': process.env.REACT_APP_API_KEY,
    }
  };

  //on id change useEffect
  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${props.id}/related`, options)
      .then((response) => {
        setRelatedIDs(response.data);
        return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${props.id}`, options);
      })
      .then((response) => {
        setPageData(response.data)
      })
  }, [props.id]);

  //Use effect for page categories
  useEffect (() => {
    if (Object.keys(pageData).length !== 0) {
      let features = pageData.features;
      let pageCategoriesObj = {'Product Name': {v1: pageData.name}};
      for (var i = 0; i < features.length; i++) {
        pageCategoriesObj[features[i].feature] = {v1: features[i].value || 'N/A'};
      }
      setPageCategories(pageCategoriesObj);
    }
  }, [pageData]);


  //get all related items to state
  useEffect(() => {
    setRelatedItems([]);
    if (relatedIDs.length !== 0) {
      let currentCallIndex = 0;
      let result = [];
      const callback = function () {
        let item = {};
        axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${relatedIDs[currentCallIndex]}`, options)
          .then((response) => {
            item.product = response.data;
            return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/reviews/meta/?product_id=${relatedIDs[currentCallIndex]}`, options);
          })
          .then((response) => {
            item.meta = response.data;
            return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${relatedIDs[currentCallIndex]}/styles`, options);
          })
          .then((response) => {
            item.styles = response.data;
            result.push(item);
            currentCallIndex++;
          })
          .then(() => {
            if (currentCallIndex === relatedIDs.length) {
              setRelatedItems(result);
            } else {
              callback();
            }
          })
          .catch((err) => {
            console.log('Error setting related items', err);
          })
      }
      callback();
    }
  }, [relatedIDs]);

  if (!pageCategories || !relatedItems) {
    return <div>Loading...</div>
  }

  return (
    <div className="r-i">
      <h2>Related Items</h2>
      <hr/>
      <div className="r-i-carousel">
        {relatedItems.length === 0 && <div className="r-i-missing">Loading...</div>}
        {(currentItemsIndex > 0) && <div className="r-i-carousel-btn-left" onClick={onLeftClick}><FaArrowLeft /></div>}
        {/* {(currentItemsIndex = 0) && <button className="r-i-carousel-btn">Left</button>} */}
        <div className="r-i-carousel-card-holder r-i-carousel">
        {relatedItems.map((item, index) => {
          if (relatedItems.indexOf(item) >= currentItemsIndex && relatedItems.indexOf(item) <= lastItemIndex) {
            return <Card key={index} item={item} setID={props.setID} clearIndex={clearIndex} pageData={pageCategories} related={relatedItems} type={{type: 'related'}}/>
          }
        })}
        </div>
        {(lastItemIndex + 1 < relatedItems.length) && <div className="r-i-carousel-btn-right" onClick={onRightClick}><FaArrowRight /></div>}
      </div>
      <h2>Your Outfit</h2>
      <hr/>
      <div className="y-o-carousel">
        {(firstOutfitIndex > 0) && <div className="r-i-carousel-btn-left" onClick={onYOLeftClick}><FaArrowLeft /></div>}
        <div className="r-i-carousel-card-holder r-i-carousel">
        <div className='r-i-card' onClick={addToOutfit}>
          <p className="y-o-add-txt">Add to Outfit</p>
          <img className="y-o-add" src="https://upload.wikimedia.org/wikipedia/commons/9/9e/Plus_symbol.svg"></img>
        </div>
        {(yourOutfit.length >= 1) && yourOutfit.map((item, index) => {
          let current = yourOutfit.indexOf(item);
          if (current >= firstOutfitIndex && current <= lastOutfitIndex) {
            return <Card key={index} item={item} setID={props.setID} clearIndex={clearIndex} deleteOutfitItem={deleteOutfitItem} type={{type: 'outfit'}}/>
          }
        })}
        </div>
        {(lastOutfitIndex + 1 < yourOutfit.length) && <div className="r-i-carousel-btn-right" onClick={onYORightClick}><FaArrowRight /></div>}
      </div>
    </div>
  )
};

export default Related;

//API calls
//https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/65631
//https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products
//https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/65631/related

//{for (var i = 0; i < relatedItems.length; i ++) {if (i >= currentItemsIndex && i <= (currentItemsIndex+3)) {return <Card item={relatedItems[i]} setID={props.setID} />}}}
// {relatedItems.map((item) => {
//   return <Card item={item} setID={props.setID} />
// })}