import React from 'react';
import ReviewSummary from './Reviews/ReviewSummary.jsx';
import ReviewList from './Reviews/ReviewList.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(<div>
      <h3>Reviews</h3>
      <section id='reviews'>
        <ReviewSummary className='review-section'/>
        <ReviewList className='review-section'/>
      </section>
    </div>)
  }
}

export default Reviews;