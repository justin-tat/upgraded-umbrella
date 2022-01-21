const axios = require('axios');
const { API_TOKEN } = process.env.API_KEY || require('../config.js');

const getAllReviews = (productId) => {
  return axios({
    baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp',
    url: '/reviews',
    method: 'get',
    headers: {'Authorization' : API_TOKEN },
    params: { product_id: productId }
  });
}

module.exports = {
  getAllReviews,
}