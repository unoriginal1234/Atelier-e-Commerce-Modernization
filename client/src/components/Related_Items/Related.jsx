import React from 'react';
import {useState} from 'react';

const Related = function (props) {
  const onClick = function() {
    console.log(props.meta, props.id);
  }
  const changeID = function () {
    console.log(props.setID);
    props.setID(20);
  }
  return (
    <div>
      <p onClick={onClick}>Related stuff id={props.id}</p>
      <button onClick={changeID}>Click ME!</button>
    </div>
  )
};

export default Related;