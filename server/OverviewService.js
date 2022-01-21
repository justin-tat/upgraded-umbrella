const axios = require('axios');
const { API_TOKEN } = process.env.API_KEY || require('../config.js');

const getStarReviews = (productId) => {
    return axios({
        baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp',
        url: '/reviews/meta',
        method: 'get',
        headers: { 'Authorization': API_TOKEN },
        params: { product_id: productId }
    })
    .then((results) => {
        // console.log('Testing inside of overview Service:', results);
        return results;
    })
    .catch(err => {
        console.log("catch in getStarReviews ", err);
    });
}

const getProductOverview = (productId) => {
    return axios({
        baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp',
        url: '/products/' + productId,
        method: 'get',
        headers: { 'Authorization': API_TOKEN },
    })
    .catch(err => {
        console.log('Failing inside of getProductOverview of overviewService.js', err);
    });
}

const getStyles = (productId) => {
    return axios({
        baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp',
        url: `/products/${productId}/styles`,
        method: 'get',
        headers: { 'Authorization': API_TOKEN },
        //params: {product_id: productId}
    })
    .catch(err => {
        console.log('Failedi inside of getStyles of OverviewService.js', err);
    });
}

module.exports = {
    getStarReviews, getProductOverview, getStyles,
}