import React from 'react';
import ReviewTile from './ReviewTile.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(<div className='reviewList'>
      {this.props.reviews.length} reviews, sorted by <select onChange={this.props.sort}>
        <option value='relevance'>relevance</option>
        <option value='helpful'>helpful</option>
        <option value='newest'>newest</option>
      </select>
      {
        this.props.reviews.map(review => {
          return <ReviewTile key={review.review_id} review={review}/>
        })
      }
    </div>)
  }
}

export default ReviewList;