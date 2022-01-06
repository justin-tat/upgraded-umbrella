import React from 'react';

class ReviewSummary extends React.Component {
  constructor(props) {
    super(props);
  }

  getAverageRating(reviews) {
    let ratingSum = 0;
    for (let review of reviews) {
      ratingSum += review.rating;
    }
    let averageRating = ratingSum / reviews.length;
    return averageRating;
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
      <h4>Review Summary</h4>
      <div>Average Rating: {this.getAverageRating(this.props.reviews)}</div>
      <div>{this.getRecommendPercent(this.props.reviews)}% of reviews recommend this product</div>
    </div>)
  }
}

export default ReviewSummary;