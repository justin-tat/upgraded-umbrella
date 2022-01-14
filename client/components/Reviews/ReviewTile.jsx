import React from 'react';

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(<>
        <div>Rating: {this.props.review.rating}</div>
        <div>Reviewer: {this.props.review.reviewer_name}</div>
        <div>Date: {this.props.review.date}</div>
        <div>Summary: {this.props.review.summary}</div>
        <div>Review: {this.props.review.body}</div>
        <div>Helpful? Yes({this.props.review.helpfulness})</div>
    </>)
  }
}

export default ReviewTile;