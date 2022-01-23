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

const getCart = () => {
    return axios({
        baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp',
        url: '/cart',
        method: 'get',
        headers: { 'Authorization': API_TOKEN },
    })
    .then(data => {
        return data;
    })
    .catch(err => {
        console.log("Failed inside of getCart of OverviewService.js", err);
    });
}

const postCart = (skuID, numItems) => {
    var promisesArr = [];
    for(var i = 0; i < numItems; i++) {
        promisesArr.push(axios({
            baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp',
            url: '/cart',
            method: 'post',
            headers: {'Authorization': API_TOKEN},
            data: {sku_id: parseInt(skuID)}
        }))
    }
    return Promise.all(promisesArr)
    .catch(err => {
        console.log('Failed inside of postCart of OverviewService.js', err);
    })
}

module.exports = {
    getStarReviews, getProductOverview, getStyles, getCart, postCart
}
