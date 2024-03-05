import React from 'react';

const ProuctBreakdown = ({reviewsMeta}) => {

  console.log(reviewsMeta)

  if (!reviewsMeta.characteristics || !reviewsMeta.recommended){
    return (
      <p>Loading...</p>
    )
  }

  return (
    <div>
      {Object.keys(reviewsMeta.characteristics).map((characteristic, index)=>{
        return <p key={index}>{characteristic} : {Math.round(parseFloat(reviewsMeta.characteristics[characteristic].value) * 10) / 10}</p>
      })}
    <p>{Math.round(parseInt(reviewsMeta.recommended.true) / (parseInt(reviewsMeta.recommended.true) + parseInt(reviewsMeta.recommended.false)) * 100)} % recommend</p>
    </div>
  )
}

export default ProuctBreakdown