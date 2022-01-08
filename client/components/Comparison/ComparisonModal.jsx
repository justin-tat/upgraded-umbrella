import React from 'react';
import Check from './ComparisonImages/checkMark.png';

const Feature = (props) => {
  return(
    <div className='featureRow'>
      <img className='leftCheck'  ></img>
      <div className='featureName'>{props.item.feature}: {props.item.value} </div>
      <img className='rightCheck'  ></img>
    </div>
  )
}

const ComparisonModal = (props) => {
  if (!props.show) {
    return null
  }
  var clickedItemList = props.relatedData.features;
  var currItemList = props.currProductData.features;
  var clickedFeatures = clickedItemList.map((item) =>
    <Feature key={props.relatedData.id} item={item} />
  );
  var currFeatures = currItemList.map((item) =>
    <Feature key={props.currProductData.id} item={item} />
  )
  return (
    <div className='comparisonModal' onClick={props.onClose}>
      <div className='modalContent' >
        <div className='modalHeader'>
          <h4 className='modalTitle'>Comparing</h4>
        </div>
        <div className='modalBody'>
          {clickedFeatures}
          {currFeatures}
        </div>
        <div className='modalFooter'>
        </div>
      </div>
    </div>
  )
}

export default ComparisonModal;