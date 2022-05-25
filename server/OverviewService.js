const axios = require('axios');
const { API_TOKEN } = process.env.API_KEY || require('../config.js');

let load = 'http://ec2-44-202-243-147.compute-1.amazonaws.com'
let server = 'http://ec2-34-227-173-64.compute-1.amazonaws.com'

const getStarReviews = (productId) => {
    return axios({
        baseURL: server,
        url: '/reviews/meta',
        method: 'get',
        headers: { 'Authorization': API_TOKEN },
        params: { product_id: productId }
    })
    .then((results) => {
        return results;
    })
    .catch(err => {
        console.log("catch in getStarReviews ");
    });
}

const getProductOverview = (productId) => {
    return axios({
        baseURL: server,
        url: '/products/' + productId,
        method: 'get',
        headers: { 'Authorization': API_TOKEN },
    })
    .catch(err => {
        console.log('Failing inside of getProductOverview of overviewService.js');
    });
}

const getStyles = (productId) => {
    return axios({
        baseURL: server,
        url: `/products/${productId}/styles`,
        method: 'get',
        headers: { 'Authorization': API_TOKEN },
        //params: {product_id: productId}
    })
    .catch(err => {
        console.log('Failedi inside of getStyles of OverviewService.js');
    });
}

const getCart = () => {
    return axios({
        baseURL: server,
        url: '/cart',
        method: 'get',
        headers: { 'Authorization': API_TOKEN },
    })
    .then(data => {
        return data;
    })
    .catch(err => {
        console.log("Failed inside of getCart of OverviewService.js");
    });
}

const postCart = (skuID, numItems) => {
    var promisesArr = [];
    for(var i = 0; i < numItems; i++) {
        promisesArr.push(axios({
            baseURL: server,
            url: '/cart',
            method: 'post',
            headers: {'Authorization': API_TOKEN},
            data: {sku_id: parseInt(skuID)}
        }))
    }
    return Promise.all(promisesArr)
    .catch(err => {
        console.log('Failed inside of postCart of OverviewService.js');
    })
}

module.exports = {
    getStarReviews, getProductOverview, getStyles, getCart, postCart
}
