import React from 'react';
const {useState} = React;

const Sort = ({totalReviews, sortHandler}) => {


  return (
    <div>
      <p>{totalReviews} Reviews, sorted by:
      <select onChange={()=>sortHandler(event.target.value)}>
        <option value="relevant">Relevance</option>
        <option value="newest">Newest</option>
        <option value="helpful">Helpful</option>
      </select>
      </p>
    </div>
  )
}

export default Sort