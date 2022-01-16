const axios = require('axios');
const { API_Token } = require('../client/config/apiKey.js');

const createProductObj = (productId) => {
  return axios({
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp',
      url: '/products/' + productId,
      method: 'get',
      headers: { 'Authorization': API_Token }
  });
}

const addRatingsData = (productId) => {
  return axios({
    baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp',
    url: `/reviews/meta/?product_id=${productId}`,
    method: 'get',
    headers: { 'Authorization': API_Token },
  });
}

const addRelatedData = (productId) => {
  return axios({
    baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp',
    url: `/products/${productId}/related/`,
    method: 'get',
    headers: { 'Authorization': API_Token },
  });
}

const addImageData = (productId) => {
  return axios({
    baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp',
    url: `/products/${productId}/styles/`,
    method: 'get',
    headers: { 'Authorization': API_Token },
  });
}

module.exports = {
  createProductObj,
  addRatingsData,
  addRelatedData,
  addImageData
}