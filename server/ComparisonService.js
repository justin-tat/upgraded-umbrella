const axios = require('axios');
const { API_TOKEN } = process.env.API_KEY || require('../config.js');

let load = 'http://ec2-44-202-243-147.compute-1.amazonaws.com'
let server = 'http://ec2-34-227-173-64.compute-1.amazonaws.com'

const createProductObj = (productId) => {
  return axios({
      baseURL: server,
      url: `/products/${productId}`,
      method: 'get',
      headers: { 'Authorization': API_TOKEN }
  });
}

const addRatingsData = (productId) => {
  return axios({
    baseURL: server,
    // url: `/reviews/meta/?product_id=${productId}`,
    url: 'reviews/meta',
    method: 'get',
    headers: { 'Authorization': API_TOKEN },
    params: {product_id: productId}
  });
}

const addRelatedData = (productId) => {
  return axios({
    baseURL: server,
    url: `/products/${productId}/related/`,
    method: 'get',
    headers: { 'Authorization': API_TOKEN },
  });
}

const addImageData = (productId) => {
  return axios({
    baseURL: server,
    url: `/products/${productId}/styles/`,
    method: 'get',
    headers: { 'Authorization': API_TOKEN },
  });
}

module.exports = {
  createProductObj,
  addRatingsData,
  addRelatedData,
  addImageData
}