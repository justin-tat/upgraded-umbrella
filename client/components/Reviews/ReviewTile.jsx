import React from 'react';
import StarRating from './StarRating.jsx';

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
  }

  createReviewStarRatingArray(review) {
    let starRatingArray = [];
    let rating = review.rating;

    while (rating > 0) {
      rating--;
      if (rating > 0) {
        starRatingArray.push(1);
      } else {
        starRatingArray.push(1 + rating)
      }
    }

    while (starRatingArray.length < 5) {
      starRatingArray.push(0);
    }

    return starRatingArray;
  }

  render() {
    return(<div className='review-tile'>
        <div className='rating-display'>{this.createReviewStarRatingArray(this.props.review).map((starFillStatus, index) => {
          return <StarRating key={index} starFillStatus={starFillStatus}/>
        })}
          <div className='review-info'>
            <img className='review-check-mark' src='./img/review-check-mark.png'></img> {this.props.review.reviewer_name}, {this.props.review.date}
        </div>
        </div>
        <div className='review-title'>{this.props.review.summary}</div>
        <div className='review-body'>{this.props.review.body}</div>
        <div className='helpful'>Helpful?
          <div value={this.props.review.review_id} onClick={this.props.onHelpfulClick} className='helpful-clickable'>Yes({this.props.review.helpfulness})</div>|
          <div value={this.props.review.review_id} onClick={this.props.onReportClick} className='helpful-clickable'>Report</div>
        </div>
        <hr></hr>
    </div>)
  }
}

export default ReviewTile;