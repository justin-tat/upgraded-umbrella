import React from 'react';
import Check from './ComparisonImages/checkMark.png';

const Feature = (props) => {
  console.log('Feature Props: ', props);
  if (props.feature.check === 'right') {
    var rightCheck = Check;
  } else if (props.feature.check === 'left') {
    var leftCheck = Check;
  } else {
    var rightCheck, leftCheck = Check;
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
  console.log(props);
  var foundSharedFeature;
  var relatedFeatureList = props.relatedProduct.features;
  var currentFeatureList = props.currProductData.features;
  if (!props.show) {
    return null
  }
  var allFeatureList = currentFeatureList;
  allFeatureList.forEach(feature => feature.check = 'left');
  var holdingArray = [];
  for (var relatedFeature of relatedFeatureList) {
    foundSharedFeature = false;
    for (var allFeature of allFeatureList) {
      if (relatedFeature.feature === allFeature.feature && relatedFeature.value === allFeature.value) {
        allFeature.check = 'both';
        foundSharedFeature = true;
      }
    }
    if (!foundSharedFeature) {
      relatedFeature.check = 'right';
      holdingArray.push(relatedFeature);
    }
  }
  allFeatureList = allFeatureList.concat(holdingArray);
  var modalFeatures = allFeatureList.map((feature) =>
    <Feature key={props.relatedProduct.styleId ? props.relatedProduct.styleId + props.relatedProduct.id : props.relatedProduct.id} feature={feature} />
  );

  return (
    <div className='comparisonModal' onClick={props.onClose}>
      <div className='modalContent' >
        <div className='modalHeader'>
          <p className='modalTitle'>Comparing</p>
          <div className='modalProductNames' >
            <div className='currentName'>{props.currProductData.name}</div> <div className='relatedName'>{props.relatedProduct.name}</div>
          </div>
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