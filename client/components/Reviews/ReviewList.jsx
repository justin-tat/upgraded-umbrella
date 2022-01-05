import React from 'react';
import ReviewTile from './ReviewTile.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(<div>
      <ReviewTile/>
      <ReviewTile/>
      <ReviewTile/>
    </div>)
  }
}

export default ReviewList;