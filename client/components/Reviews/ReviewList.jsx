import React from 'react';
import ReviewTile from './ReviewTile.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(<div className='reviewList'>
      <h4>Review List</h4>
      {this.props.reviews.length} reviews, sorted by <select>
        <option>relevance</option>
        <option>helpful</option>
        <option>newest</option>
      </select>
      <ul>
        {this.props.reviews.map(review => {
          return <ReviewTile key={review.review_id} review={review}/>
        })}
      </ul>
    </div>)
  }
}

export default ReviewList;