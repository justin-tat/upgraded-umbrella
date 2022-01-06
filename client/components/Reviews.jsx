import React from 'react';
import ReviewSummary from './Reviews/ReviewSummary.jsx';
import ReviewList from './Reviews/ReviewList.jsx';
import axios from 'axios';

class Reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: 59554,
      reviews: [],
      averageRating: null
    }
  }

  componentDidMount() {
    this.getReviews(this.state.productId);
  }

  getReviews(productId) {
    axios({
      baseURL: 'http://localhost:3000',
      url: '/reviews',
      method: 'get',
      params: { productId: productId }
    }).then(result => {
      let reviews = result.data;
      console.log(reviews);
      this.setState({
        reviews: reviews
      })
    });
    //handle case where we do not successfully retrieve a productId by letting client display error
  }

  render() {
    return(<>
      <h3>Ratings &amp; Reviews</h3>
      <section id='reviews'>
        <ReviewSummary reviews={this.state.reviews}/>
        <ReviewList reviews={this.state.reviews}/>
      </section>
    </>)
  }
}

export default Reviews;