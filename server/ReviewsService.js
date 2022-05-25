const axios = require('axios');
const { API_TOKEN } = process.env.API_KEY || require('../config.js');

let load = 'http://ec2-44-202-243-147.compute-1.amazonaws.com'
let server = 'http://ec2-34-227-173-64.compute-1.amazonaws.com'

//ssh -i "FirstSDCserver.pem" ubuntu@ec2-34-227-173-64.compute-1.amazonaws.com

const getAllReviews = (productId) => {
  return axios({
    baseURL: server,
    url: '/reviews',
    method: 'get',
    headers: {'Authorization' : API_TOKEN },
    params: {
      product_id: productId,
      sort: 'newest',
      count: 10
    }
  });
}

const getAllReviewsMeta = (productId) => {
  return axios({
    baseURL: server,
    url: '/reviews/meta',
    method: 'get',
    headers: {'Authorization' : API_TOKEN },
    params: { product_id: productId }
  });
}

const addReview = (productId, rating, summary, body, recommend, name, email) => {
  return getAllReviewsMeta(productId).then(result => {
    return result.data.characteristics;
  }).then(characteristics => {
    let charId;
    let charValue;
    for (let element in characteristics) {
      charId = String(characteristics[element]['id']);
    }
    let characteristic = {};
    characteristic[charId] = 3;
    return axios({
      baseURL: server,
      url: '/reviews',
      method: 'post',
      headers: {'Authorization' : API_TOKEN },
      data: {
        'product_id': productId,
        'rating': rating,
        'summary': summary,
        'body': body,
        'recommend': recommend,
        'name': name,
        'photos': [],
        'email': email,
        'characteristics': characteristic
      }
    }).catch(err => {
      console.log(`Error posting review for product ${productId}`, err);
    })
  })
}

const markHelpful = (reviewId) => {
  return axios({
    baseURL: server,
    url: `/reviews/${reviewId}/helpful`,
    method: 'put',
    headers: {'Authorization' : API_TOKEN },
  });
}

const reportReview = (reviewId) => {
  return axios({
    baseURL: server,
    url: `/reviews/${reviewId}/report`,
    method: 'put',
    headers: {'Authorization' : API_TOKEN },
  });
}

module.exports = {
  getAllReviews,
  getAllReviewsMeta,
  addReview,
  markHelpful,
  reportReview
}