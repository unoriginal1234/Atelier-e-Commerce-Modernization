import React from 'react';
import { useState } from 'react';

const RelatedCategory = function ({category, values}) {
  let value1 = values[category].v1 || 'N/A';
  let value2 = values[category].v2 || 'N/A';

  return (
    <div>
      <div className="r-i-category">
        <div>{value1}</div>
        <div>{category}</div>
        <div>{value2}</div>
      </div>
      <hr></hr>
    </div>
  )
};

export default RelatedCategory;