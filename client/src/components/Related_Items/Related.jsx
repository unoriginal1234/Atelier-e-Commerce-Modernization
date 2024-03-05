import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card.jsx';

const Related = function (props) {
  const [relatedIDs, setRelatedIDs] = useState([]);
  const [relatedItems, setRelatedItems] = useState([]);
  const [yourOutfit, setYourOutfit] = useState([]);
  const [currentItemsIndex, setCurrentItemsIndex] = useState(0);
  const [lastItemIndex, setLastItemIndex] = useState(3);
  const [firstOutfitIndex, setFirstOutfitIndex] = useState(0);
  const [lastOutfitIndex, setLastOutfitIndex] = useState(2);
  const [pageData, setPageData] = useState({});
  const [pageCategories, setPageCategories] = useState({}) //f1: {v1: val1, v2: val2}

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
    console.log('added to outfit');
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
  };

  //Create features object



  //API object
  const options = {
    headers: {
      'Authorization': `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`
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
      let pageCategoriesObj = {};
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


  return (
    <div className="r-i">
      <h2>Related Items</h2>
      <div className="r-i-carousel">
        {(currentItemsIndex > 0) && <button className="r-i-carousel-btn" onClick={onLeftClick}>Left</button>}
        {relatedItems.map((item) => {
          if (relatedItems.indexOf(item) >= currentItemsIndex && relatedItems.indexOf(item) <= lastItemIndex) {
            return <Card item={item} setID={props.setID} clearIndex={clearIndex} pageData={pageCategories} related={relatedItems} type={{type: 'related'}}/>
          }
        })}
        {(lastItemIndex + 1 < relatedItems.length) && <button className="r-i-carousel-btn" onClick={onRightClick}>Right</button>}
      </div>
      <h2>Your Outfit</h2>
      <div className="y-o-carousel">
        {(firstOutfitIndex > 0) && <button className="r-i-carousel-btn" onClick={onYOLeftClick}>Left</button>}
        <div className='r-i-card' onClick={addToOutfit}>
          <p>Add Card</p>
          <img className="y-o-add" src="https://upload.wikimedia.org/wikipedia/commons/9/9e/Plus_symbol.svg"></img>
        </div>
        {(yourOutfit.length >= 1) && yourOutfit.map((item) => {
          let current = yourOutfit.indexOf(item);
          if (current >= firstOutfitIndex && current <= lastOutfitIndex) {
            return <Card item={item} setID={props.setID} clearIndex={clearIndex} type={{type: 'outfit'}}/>
          }
        })}
        {(lastOutfitIndex + 1 < yourOutfit.length) && <button className="r-i-carousel-btn" onClick={onYORightClick}>Right</button>}
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