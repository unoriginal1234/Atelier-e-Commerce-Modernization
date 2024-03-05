import React from 'react';
import {useState} from 'react';

const Card = function ({item, setID}) {
  const [currentCard, setCurrentCard] = useState(item.id);
  //console.log(currentCard);
  //console.log(item);

  const changeID = function () {
    setID(currentCard);
  }

  return (
    <div onClick={changeID}>
      <button>ACTION BUTTON</button>
      <p>img</p>
      <div>{item.category}</div>
      <div>{item.name}</div>
      <span>{item.default_price}</span>
      <div>STAR RATING</div>
    </div>
  )
};

export default Card;