import React from 'react';
import StarRating from './StarRating.jsx';

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

  render() {
    return(<div className='reviewSummary'>
      <div className='averageRating'>{String (this.props.averageRating)}</div>
      <div className='averageRatingDisplay'>{
        this.props.starRatingArray.map((starFillStatus, index) => {
          return <StarRating key={index} starFillStatus={starFillStatus}/>
        })
      }</div>
      <div>{this.getRecommendPercent(this.props.reviews)}% of reviews recommend this product</div>
    </div>)}
}

export default ReviewSummary;