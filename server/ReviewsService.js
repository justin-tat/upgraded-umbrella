const axios = require('axios');
const { token } = require('../config.js');

const getAllReviews = (productId) => {
  return axios({
    baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp',
    url: '/reviews',
    method: 'get',
    headers: {'Authorization' : token},
    params: { product_id: productId }
  });
}

module.exports = {
  getAllReviews,
}