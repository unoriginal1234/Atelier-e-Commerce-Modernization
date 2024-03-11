import React from 'react';

const SeeMore = ({fetchMore}) => {
  return (
    <div>
      <button className="rr-see-more-btn" onClick={()=>fetchMore()}>See More...</button>
    </div>
  )
}

export default SeeMore