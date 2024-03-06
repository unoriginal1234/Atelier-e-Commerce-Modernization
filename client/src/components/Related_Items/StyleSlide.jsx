import React from 'react';
import {useState, useEffect} from 'react';

const StyleSlide = function (props) {
  const url = props.style.photos[0].thumbnail_url || `https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg`;

  return (
    <div className="r-i-style-card"><img className="r-i-style-img" src={url}/></div>
  )
}

export default StyleSlide;