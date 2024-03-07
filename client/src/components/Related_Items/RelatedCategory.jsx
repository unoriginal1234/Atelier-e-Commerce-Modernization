import React from 'react';
import { useState } from 'react';

const RelatedCategory = function ({category, values}) {
  let value1 = values[category].v1 || 'N/A';
  let value2 = values[category].v2 || 'N/A';

  return (
    <div>
      {category === 'Product Name' && <div className="r-i-category-title">
        <div className="r-i-secret-v1">{value1}</div>
        <div className="r-i-secret-cat">{category}</div>
        <div className="r-i-secret-v2">{value2}</div>
    </div>}
      {category !== 'Product Name' && <div className="r-i-category">
        <div className="r-i-secret-v1">{value1}</div>
        <div className="r-i-secret-cat">{category}</div>
        <div className="r-i-secret-v2">{value2}</div>
      </div>}
    </div>
  )
};

export default RelatedCategory;