const axios = require('axios');
const { API_Token } = require('../client/config/apiKey.js');

const getStarReviews = (productId) => {
    return axios({
        baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp',
        url: '/reviews/meta',
        method: 'get',
        headers: { 'Authorization': token },
        params: { product_id: productId }
    })
    .then((results) => {
        //console.log('Testing inside of overview Service:', results);
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
        headers: { 'Authorization': token },
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
        headers: { 'Authorization': token },
        //params: {product_id: productId}
    })
    .catch(err => {
        console.log('Failedi inside of getStyles of OverviewService.js', err);
    });
}

module.exports = {
    getStarReviews, getProductOverview, getStyles,
}