import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card.jsx';

const Related = function (props) {
  const [relatedIDs, setRelatedIDs] = useState([]);
  const [relatedItems, setRelatedItems] = useState([]);
  const [yourOutfit, setYourOutfit] = useState([]);

  //API object
  const options = {
    headers: {
      'Authorization': `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`
    }
  };
  //related array useEffect
  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${props.id}/related`, options)
      .then((response) => {
        setRelatedIDs(response.data);
      })
  }, [props.id]);

  //related array of Objects useEffect
  useEffect(() => {
    setRelatedItems([]);
    if (relatedIDs.length !== 0) {
      let currentCallIndex = 0;
      let result = [];
      const callback = function () {
        axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${relatedIDs[currentCallIndex]}`, options)
          .then((response) => {
            result.push(response.data);
            currentCallIndex++;
          })
          .then(() => {
            if (currentCallIndex === relatedIDs.length) {
              setRelatedItems(result);
            } else {
              callback();
            }
          })
      }
      callback();
    }
  }, [relatedIDs]);

  // if (!relatedItems) {
  //   return <div>Loading ...</div>
  // } else {
  return (
    <div>
      <p>Related stuff id={props.id}</p>
      {relatedItems.map((item) => {
        return <Card item={item} setID={props.setID} />
      })}
    </div>
  )
  //  }
};

export default Related;

//API calls
//https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/65631
//https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products
//https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/65631/related