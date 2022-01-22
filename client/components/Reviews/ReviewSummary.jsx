import React from 'react';
import StarRating from './StarRating.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';

class ReviewSummary extends React.Component {
  constructor(props) {
    super(props);
  }

  getRecommendPercent(reviewsMeta) {
    let recommendPercent = 0;
    if (reviewsMeta !== null) {
      let recommendCount = Number(reviewsMeta.recommended.true);
      let totalCount = Number(reviewsMeta.recommended.false) + Number(reviewsMeta.recommended.true);
      recommendPercent = (recommendCount / totalCount) * 100;
    }
    return String(Math.round(recommendPercent));
  }

  getNumReviews(reviewsMeta) {
    let count = 0;
    if (reviewsMeta !== null) {
      for (let index in reviewsMeta.ratings) {
        count += Number(reviewsMeta.ratings[index]);
      }
    }
    return String(count);
  }

  getCharacteristics() {
    let characteristicsArray = [];
    if (this.props.reviewsMeta !== null) {
      let characteristics = this.props.reviewsMeta.characteristics;
      for (let name in characteristics) {
        let characteristic = {
          'name': name,
          'value': characteristics[name]['value']
        }
        characteristicsArray.push(characteristic);
      }
    }
    return characteristicsArray;
  }

  render() {
    return(<div className='reviewSummary'>
      <div className='averageRating'>{String (this.props.averageRating)}</div>
      <div className='averageRatingDisplay'>{
        this.props.starRatingArray.map((starFillStatus, index) => {
          return <StarRating key={index} starFillStatus={starFillStatus}/>
        })
      }</div>
      <div className='recommend-percent'>{this.getRecommendPercent(this.props.reviewsMeta)}% of reviews recommend this product</div>
      <RatingBreakdown
        reviewsMeta={this.props.reviewsMeta}
        numReviews={this.getNumReviews(this.props.reviewsMeta)}
      />
      <p></p>
      <div>
        {this.getCharacteristics().map((characteristic, index) => {
          return <ProductBreakdown key={index} name={characteristic.name} value={characteristic.value}/>
        })}
      </div>
    </div>)}
}

export default ReviewSummary;