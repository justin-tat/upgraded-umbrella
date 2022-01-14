const axios = require('axios');
const { API_Token } = require('../client/config/apiKey.js');

const getAllReviews = (productId) => {
  return axios({
    baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp',
    url: '/reviews',
    method: 'get',
    headers: {'Authorization' : API_Token},
    params: { product_id: productId }
  });
}

module.exports = {
  getAllReviews,
}