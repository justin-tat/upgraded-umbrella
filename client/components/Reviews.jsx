import React from 'react';
import ReviewSummary from './Reviews/ReviewSummary.jsx';
import ReviewList from './Reviews/ReviewList.jsx';
import WriteReviewModal from './Reviews/WriteReviewModal.jsx';
import axios from 'axios';

class Reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      reviewsMeta: null
    }

    this.sort = this.sort.bind(this);
    this.writeReviewBtnClick = this.writeReviewBtnClick.bind(this);
    this.writeReviewSubmitBtnClick = this.writeReviewSubmitBtnClick.bind(this);
  }

  componentDidMount() {
    this.getReviewsMeta(this.props.productId);
    this.getReviews(this.props.productId);
  }

  getAverageRating(reviewsMeta) {
    if (reviewsMeta !== null) {
      let ratingSum = 0;
      let ratingCount = 0;
      ratingSum += Number(reviewsMeta.ratings[1]);
      ratingSum += Number(reviewsMeta.ratings[2]) * 2;
      ratingSum += Number(reviewsMeta.ratings[3]) * 3;
      ratingSum += Number(reviewsMeta.ratings[4]) * 4;
      ratingSum += Number(reviewsMeta.ratings[5]) * 5;

      ratingCount += Number(reviewsMeta.ratings[1]);
      ratingCount += Number(reviewsMeta.ratings[2]);
      ratingCount += Number(reviewsMeta.ratings[3]);
      ratingCount += Number(reviewsMeta.ratings[4]);
      ratingCount += Number(reviewsMeta.ratings[5]);
      let averageRating = Math.round((ratingSum/ratingCount) * 10)/10;
      return averageRating;
    }
  }

  //Creates a 5 element Number array, where each element represents the fill status of the star
  createStarRatingArray(averageRating) {
    let starRatingArray = [];

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
      console.log(`Error fetching product reviews with ${productId}`, err);
    })
  }

  getReviewsMeta(productId) {
    axios({
      baseURL: 'http://localhost:3000',
      url: '/reviews/meta',
      method: 'get',
      params: { productId: productId }
    }).then(result => {
      let reviewsMeta = result.data;
      this.setState({
        reviewsMeta: reviewsMeta
      });
    }).catch(err => {
      console.log(`Error fetching product review meta data with ${productId}`, err);
    })
  }

  getRatingsBreakDown(reviewsMeta) {
    if (reviewsMeta !== null) {
      return reviewsMeta.ratings;
    }
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

  writeReviewBtnClick(event) {
    let dialog = document.getElementById('write-review-dialog');
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      alert('The <dialog> API is not supported by this browser');
    }
  }

  writeReviewSubmitBtnClick(event) {
    let productId = this.props.productId;
    let rating = document.getElementById('overall-rating').value;
    let recommendYes = document.getElementById('yes-recommend').checked; //on or off
    let recommendNo = document.getElementById('no-recommend').checked;
    let summary = document.getElementById('summary').value;
    let body = document.getElementById('body').value;
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    axios({
      baseURL: 'http://localhost:3000',
      url: '/reviews',
      method: 'post',
      params: {
        productId: productId,
        rating: rating,
        summary: summary,
        body: body,
        recommend: recommendYes,
        name: username,
        email: email,
      }
    }).then(result => {
      console.log('Successfully added review');
    }).catch(err => {
      console.log(`Error submitting review for ${productId}`, err);
    })
  }

  render() {
    return(<>
      <div>RATINGS &amp; REVIEWS</div>
      <section id='reviews'>
        <ReviewSummary
          reviews={this.state.reviews}
          reviewsMeta={this.state.reviewsMeta}
          // ratingBreakDown={this.getRatingsBreakDown(this.state.reviewsMeta)}
          averageRating={this.getAverageRating(this.state.reviewsMeta)}
          starRatingArray={this.createStarRatingArray(this.getAverageRating(this.state.reviewsMeta))}
        />
        <ReviewList
          reviews={this.state.reviews}
          sort={this.sort}
          sortOption={this.state.sortOption}
        />
        <WriteReviewModal writeReviewBtnClick={this.writeReviewBtnClick} writeReviewSubmitBtnClick={this.writeReviewSubmitBtnClick}/>
      </section>
    </>)
  }
}

export default Reviews;