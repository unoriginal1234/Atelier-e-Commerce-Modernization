import React from 'react';

const SeeMore = ({fetchMore}) => {
  return (
    <div>
      <button onClick={()=>fetchMore()}>See More...</button>
    </div>
  )
}

export default SeeMore