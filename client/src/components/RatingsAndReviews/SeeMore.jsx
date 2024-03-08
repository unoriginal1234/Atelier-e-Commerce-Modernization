import React from 'react';

const SeeMore = ({fetchMore}) => {
  return (
    <div>
      <button className="btn-gradient-2" onClick={()=>fetchMore()}>See More...</button>
    </div>
  )
}

export default SeeMore