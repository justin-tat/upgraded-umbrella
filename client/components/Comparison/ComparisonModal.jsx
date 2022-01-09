import React from 'react';
import Check from './ComparisonImages/checkMark.png';

const Feature = (props) => {
  console.log('Feature Props: ', props);
  if (props.feature.check === 'right') {
    console.log('RIGHT CHECK!');
    var rightCheck = Check;
  } else if (props.feature.check === 'left') {
    console.log('LEFT CHECK!');
    var leftCheck = Check;
  } else if (props.feature.check === 'both') {
    console.log('BOTH CHECK!');
    var rightCheck = Check;
    var leftCheck = Check;
  }
  return(
    <div className='featureRow'>
      <div className='checkContainer'>
        <img className='leftCheck' src={leftCheck} ></img>
      </div>
      <div className='featureName'>{props.feature.feature}: {props.feature.value} </div>
      <div className='checkContainer'>
        <img className='rightCheck' src={rightCheck} ></img>
      </div>
    </div>
  )
}

const ComparisonModal = (props) => {
  var clickedItemList = props.relatedData.features;
  var currItemList = props.currProductData.features;
  if (!props.show) {
    return null
  }
  var allItemsList = currItemList;
  allItemsList.forEach(item => item.check = 'left');
  var holdingArray = [];
  for (var clickedItem of clickedItemList) {
    var foundShared = false;
    for (var allItem of allItemsList) {
      if (clickedItem.feature === allItem.feature && clickedItem.value === allItem.value) {
        allItem.check = 'both';
        foundShared = true;
      }
    }
    if (!foundShared) {
      clickedItem.check = 'right';
      holdingArray.push(clickedItem);
    }
  }
  allItemsList = allItemsList.concat(holdingArray);
  var modalFeatures = allItemsList.map((feature) =>
    <Feature key={props.relatedData.styleId} feature={feature} />
  );

  return (
    <div className='comparisonModal' onClick={props.onClose}>
      <div className='modalContent' >
        <div className='modalHeader'>
          <p className='modalTitle'>Comparing</p>
        </div>
        <div className='modalBody'>
          {modalFeatures}
        </div>
        <div className='modalFooter'>
        </div>
      </div>
    </div>
  )
}

export default ComparisonModal;