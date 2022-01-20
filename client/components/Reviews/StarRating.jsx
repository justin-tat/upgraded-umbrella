import React from 'react';


//Receives a number between 0 and 1 in props
//If number is 1 -> full star
//If number is >= 0.625 & < 1 -> 3/4 star
//If number is >= 0.375 & < 0.625 -> 1/2 star
//If number is > 0 & < 0.375 -> 1/4 star
//If number is 0 -> empty star
const determineStarRating = (starFillStatus) => {
  let emptyStar = <img className='empty-star' src='./img/emptyStar.png'></img>;
  let quarterStar = <img className='star' src='./img/quarterStar.png'></img>;
  let halfStar = <img className='star' src='./img/halfStar.png'></img>;
  let threeQuarterStar = <img className='star' src='./img/threeQuarterStar.png'></img>;
  let filledStar = <img className='star' src='./img/filledStar.png'></img>;

  if (starFillStatus === 1) {
    return filledStar;
  } else if (starFillStatus < 1 && starFillStatus >= 0.625) {
    return threeQuarterStar;
  } else if (starFillStatus < 0.625 && starFillStatus >= 0.375) {
    return halfStar;
  } else if (starFillStatus < 0.375 && starFillStatus > 0) {
    return quarterStar
  } else {
    return emptyStar;
  }
}

var StarRating = (props) => {
  return(<>
    {
      determineStarRating(props.starFillStatus)
    }
  </>)}

export default StarRating;