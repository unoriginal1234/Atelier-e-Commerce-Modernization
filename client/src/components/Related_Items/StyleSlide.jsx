import React from 'react';
import {useState, useEffect} from 'react';

const StyleSlide = function (props) {

  const url = props.style.photos[0].thumbnail_url || `https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg`;
  const changePreviewImage = function () {
    props.change(props.index);
  }
  const img = {
    backgroundImage: `url(${url})`
  }
  return (
    <div className="r-i-style-card" style={img} onClick={changePreviewImage}></div>
  )
}

export default StyleSlide;

//<div className="r-i-style-card" onClick={changePreviewImage}><img className="r-i-style-img" src={url}/></div>