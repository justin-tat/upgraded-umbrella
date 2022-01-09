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
      this.setState({
        reviews: reviews
      }, () => this.sort());
    });
    //TODO handle case where we do not successfully retrieve a productId by letting client display error
  }

  /*
  Sorts reviews based on the specified option:
    newest - ordered by number of days since posting, asc
    helpful - ordered by count of helpful marks, desc
    relevance - helpful score * 10 - number of days since posting, desc
  */
  sort() {
    const HELPFUL_SCORE_MODIFIER = 10;
    let helpfulOrder = [];
    let newestOrder = [];
    let relevanceOrder = [];
    let sortedReviews = [];

    for (let review of this.state.reviews) {
      let helpfulScore = review.helpfulness;
      // Calculates number of days since the review was posted
      let newestScore = (Date.now() - new Date(review.date))/1000/60/60/24;
      let relevanceScore = helpfulScore * HELPFUL_SCORE_MODIFIER - newestScore;

      helpfulOrder.push([helpfulScore, review]);
      newestOrder.push([newestScore, review]);
      relevanceOrder.push([relevanceScore, review]);
    }

    if (event.target.value === 'helpful') {
      helpfulOrder.sort((a, b) => {
        return b[0] - a[0];
      })
      for (let record of helpfulOrder) {
        sortedReviews.push(record[1]);
      }
    } else if (event.target.value ==='newest') {
      newestOrder.sort((a, b) => {
        return a[0] - b[0];
      })
      for (let record of newestOrder) {
        sortedReviews.push(record[1]);
      }
    } else {
      relevanceOrder.sort((a, b) => {
        return b[0] - a[0];
      })
      for (let record of relevanceOrder) {
        sortedReviews.push(record[1]);
      }
    }

    this.setState({
      reviews: sortedReviews
    })
  }

  render() {
    return(<>
      <h3>Ratings &amp; Reviews</h3>
      <section id='reviews'>
        <ReviewSummary reviews={this.state.reviews}/>
        <ReviewList reviews={this.state.reviews} sort={this.sort.bind(this)} sortOption={this.state.sortOption}/>
      </section>
    </>)
  }
}

export default Reviews;