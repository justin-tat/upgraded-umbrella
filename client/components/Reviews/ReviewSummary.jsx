import React from 'react';
import StarRating from './StarRating.jsx';

class ReviewSummary extends React.Component {
  constructor(props) {
    super(props);
  }

  getAverageRating(reviews) {
    console.log('reviews', reviews);
    let ratingSum = 0;
    for (let review of reviews) {
      ratingSum += review.rating;
    }
    let averageRating = ratingSum / reviews.length;
    return averageRating;
  }

  //Creates a 5 element Number array, where each element represents the fill status of the star
  createStarRatingArray(reviews) {
    let starRatingArray = [];
    let averageRating = this.getAverageRating(reviews);

    while (averageRating > 0) {
      averageRating--;
      if (averageRating > 0) {
        starRatingArray.push(1);
      } else {
        starRatingArray.push(1 + averageRating)
      }
    }

    while (starRatingArray.length < 5) {
      starRatingArray.push(0);
    }

    return starRatingArray;
  }

  getRecommendPercent(reviews) {
    let recommendCount = 0;
    for (let review of reviews) {
      if (review.recommend) {
        recommendCount++;
      }
    }
    let recommendPercent = (recommendCount / reviews.length) * 100;
    return recommendPercent;
  }

  render() {
    return(<div className='reviewSummary'>
      <div className='averageRating'>{String (this.getAverageRating(this.props.reviews))}</div>
      <div className='averageRatingDisplay'>{
        this.createStarRatingArray(this.props.reviews).map(starFillStatus => {
          return <StarRating starFillStatus={starFillStatus}/>
        })
      }</div>
      <div>{this.getRecommendPercent(this.props.reviews)}% of reviews recommend this product</div>
    </div>)
  }
}

export default ReviewSummary;