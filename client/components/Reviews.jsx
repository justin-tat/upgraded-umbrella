import React from 'react';
import ReviewSummary from './Reviews/ReviewSummary.jsx';
import ReviewList from './Reviews/ReviewList.jsx';
import axios from 'axios';

class Reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      averageRating: null,
    }
  }

  componentDidMount() {
    this.getReviews(this.props.productId);
  }

  getAverageRating(reviews) {
    let ratingSum = 0;
    for (let review of reviews) {
      ratingSum += review.rating;
    }
    let averageRating = ratingSum / reviews.length;
    return averageRating;
  }

  //Creates a 5 element Number array, where each element represents the fill status of the star
  createStarRatingArray(reviews) {
    let starRatingArray = [];
    let averageRating = this.getAverageRating(reviews);

    while (averageRating > 0) {
      averageRating--;
      if (averageRating > 0) {
        starRatingArray.push(1);
      } else {
        starRatingArray.push(1 + averageRating)
      }
    }

    while (starRatingArray.length < 5) {
      starRatingArray.push(0);
    }

    return starRatingArray;
  }
  //Change to 'http://100.24.25.169'

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
    }).catch(err => {
      console.log(`Error fetching product with ${productId}`, err);
    })
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
      <div>RATINGS &amp; REVIEWS</div>
      <section id='reviews'>
        <ReviewSummary
          reviews={this.state.reviews}
          averageRating={this.getAverageRating(this.state.reviews)}
          starRatingArray={this.createStarRatingArray(this.state.reviews)}
        />
        <ReviewList
          reviews={this.state.reviews}
          sort={this.sort.bind(this)}
          sortOption={this.state.sortOption}
        />
      </section>
    </>)
  }
}

export default Reviews;