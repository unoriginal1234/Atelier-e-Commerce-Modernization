import React from 'react';
import { useState } from 'react';
import RelatedCategory from './RelatedCategory.jsx';

const Comparison = function ({ bothCategories }) {

  return (
    <div className="r-i-secret">
      <div className="r-i-secret-title">Compare</div>
      {Object.keys(bothCategories).map((key, index) => {
        return <RelatedCategory category={key} key={index} values={bothCategories}/>
      })}
    </div>
  )
};

export default Comparison;

//return <RelatedCategory category={key} values={bothCategories}/>