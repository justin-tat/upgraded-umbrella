const axios = require('axios');
const { API_TOKEN } = require('../config.js');

const getAllReviews = (productId) => {
  return axios({
    baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp',
    url: '/reviews',
    method: 'get',
    headers: {'Authorization' : API_TOKEN },
    params: { product_id: productId }
  });
}

const getAllReviewsMeta = (productId) => {
  return axios({
    baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp',
    url: '/reviews/meta',
    method: 'get',
    headers: {'Authorization' : API_TOKEN },
    params: { product_id: productId }
  });
}

const addReview = (productId, rating, summary, body, recommend, name, email) => {
  return axios({
    baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp',
    url: '/reviews/meta',
    method: 'post',
    headers: {'Authorization' : API_TOKEN },
    params: {
      product_id: productId,
      rating: rating,
      summary: summary,
      body: body,
      recommend: recommend,
      name: name,
      photos: [],
      email: email,
      characteristics: {
        "Size": {
          "id": 14,
          "value": "4.0000"
        }
      }
    }
  });
}

module.exports = {
  getAllReviews,
  getAllReviewsMeta,
  addReview
}