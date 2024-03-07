import React from 'react';
import { AiTwotoneTag } from "react-icons/ai";

{/* <AiTwotoneTag /> */}

const ProuctBreakdown = ({reviewsMeta}) => {

  if (!reviewsMeta.characteristics){
    return (
      <p>Loading...</p>
    )
  }

  const characteristicBreakdown = {
    "Size": ['A size too small', 'Perfect', 'A size too wide'],
    "Width": ['Too narrow', 'Perfect', 'Too wide'],
    "Comfort": ['Uncomfortable', 'Ok', 'Perfect'],
    "Quality": ['Poor', 'What I expected', 'Perfect'],
    "Length": ['Runs Short', 'Perfect', 'Runs long'],
    "Fit": ['Runs tight', 'Perfect', 'Runs long']
  }


  return (
    <div className="rr-product-breakdown">
      {Object.keys(reviewsMeta.characteristics).map((characteristic, index)=>{
        return <div key={index}>
            <p>{characteristic}</p>
            <div className="rr-spectrum-wrapper">
              <div className="rr-spectrum-characteristic"></div>
              <AiTwotoneTag className="rr-indicator-icon" style={{"margin-left":
              (Math.round((parseFloat(reviewsMeta.characteristics[characteristic].value) -1) * 25)).toString()+"%"}}/>
            </div>
            <div className="rr-characteristic-breakdown">
              <div>{characteristicBreakdown[characteristic][0]}</div>
              <div>{characteristicBreakdown[characteristic][2]}</div>
            </div>
          </div>
      })}
    </div>
  )
}

export default ProuctBreakdown