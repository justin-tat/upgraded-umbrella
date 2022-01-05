import React from 'react';
import ReviewSummary from './Reviews/ReviewSummary.jsx';
import ReviewList from './Reviews/ReviewList.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(<>
      <h3>Ratings &amp; Reviews</h3>
      <section id='reviews'>
        <ReviewSummary/>
        <ReviewList/>
      </section>
    </>)
  }
}

export default Reviews;