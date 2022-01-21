import React from 'react';
import StarRating from './StarRating.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';

class ReviewSummary extends React.Component {
  constructor(props) {
    super(props);
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

  getRatingBreakDown(reviews) {
    let ratingBreakDown = {
      '5': 0,
      '4': 0,
      '3': 0,
      '2': 0,
      '1': 0
    }

    for (let review of reviews) {
      switch(review.rating) {
        case 5:
          ratingBreakDown['5']++;
          break;
        case 4:
          ratingBreakDown['4']++;
          break;
        case 3:
          ratingBreakDown['3']++;
          break;
        case 2:
          ratingBreakDown['2']++;
          break;
        case 1:
          ratingBreakDown['1']++;
          break;
        default:
          console.log('Not a valid rating');
      }
    }
    return ratingBreakDown;
  }

  render() {
    return(<div className='reviewSummary'>
      <div className='averageRating'>{String (this.props.averageRating)}</div>
      <div className='averageRatingDisplay'>{
        this.props.starRatingArray.map((starFillStatus, index) => {
          return <StarRating key={index} starFillStatus={starFillStatus}/>
        })
      }</div>
      <div className='recommend-percent'>{this.getRecommendPercent(this.props.reviews)}% of reviews recommend this product</div>
      <RatingBreakdown ratingBreakDown={this.getRatingBreakDown(this.props.reviews)} numReviews={this.props.reviews.length}/>
    </div>)}
}

export default ReviewSummary;