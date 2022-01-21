import React from 'react';
import Full from './ComparisonImages/fullStar.png';
import ThreeQuarters from './ComparisonImages/threeQuarterStar.png';
import Half from './ComparisonImages/halfStar.png';
import Quarter from './ComparisonImages/quarterStar.png';
import Empty from './ComparisonImages/emptyStar.png';

const Ratings = (props) => {
  if (props.ratings === undefined) {
    return (
      <div className='rating'></div>
    );
  }
  var starRating = {
    1: '',
    2: '',
    3: '',
    4: '',
    5: ''
  }
  var sumOfAllRatings = 0;
  var numOfRatings = 0;
  var averageRating,
      ratings;

  ratings = props.ratings;
  var keys = Object.keys(ratings);
  for (var key of keys) {
    sumOfAllRatings += (Number(key) * Number(ratings[key]));
    numOfRatings += Number(ratings[key]);
  }
  averageRating = sumOfAllRatings/numOfRatings;
  for (var star = 1; star < 6; star++ ) {
    if (averageRating < 0) {
      starRating[star] = Empty;
      averageRating++;
    }
    if (averageRating >= 1) {
      starRating[star] = Full;
      averageRating --;
    } else if (averageRating === 0) {
      starRating[star] = Empty;
    } else if (averageRating < 1 && averageRating > 0) {
      if (averageRating > 0.25 && averageRating < 0.50) {
        starRating[star] = Quarter;
      } else if (averageRating > 0.50 && averageRating < 0.75) {
        starRating[star] = Half;
      } else if (averageRating > 0.75) {
        starRating[star] = ThreeQuarters;
      } else {
        starRating[star] = Empty;
      }
      averageRating = 0;
    }
  }

  return (
    <div className='rating'>
      <img className='ratingStar' src={starRating[1]}></img>
      <img className='ratingStar' src={starRating[2]}></img>
      <img className='ratingStar' src={starRating[3]}></img>
      <img className='ratingStar' src={starRating[4]}></img>
      <img className='ratingStar' src={starRating[5]}></img>
    </div>
  )
}

export default Ratings;