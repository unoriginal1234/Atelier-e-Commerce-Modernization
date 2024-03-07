import React from 'react';

const ProuctBreakdown = ({reviewsMeta}) => {

  if (!reviewsMeta.characteristics || !reviewsMeta.recommended){
    return (
      <p>Loading...</p>
    )
  }

  return (
    <div className="rr-product-breakdown">
      {Object.keys(reviewsMeta.characteristics).map((characteristic, index)=>{
        return <p key={index}>{characteristic} : {Math.round(parseFloat(reviewsMeta.characteristics[characteristic].value) * 10) / 10}</p>
      })}
    </div>
  )
}

export default ProuctBreakdown