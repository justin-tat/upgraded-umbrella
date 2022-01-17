import React from 'react';
import jquery from 'jquery';
import axios from 'axios';
import Related from './Comparison/Related.jsx';
import Outfit from './Comparison/Outfit.jsx';
import API_Token from '../config/apiKey.js';

class Comparison extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfit: [],
      related: [],
      productId: props.productId || 59553,
      productData: {}
      }
    this.addOutfitItem = this.addOutfitItem.bind(this);
    this.removeOutfitItem = this.removeOutfitItem.bind(this);
    this.changeId = this.changeId.bind(this);
  }

componentDidMount() {
  this.fillCarousels(this.state.productId);
  this.checkLocalStorage((err, storageData) =>{
    if (err) {
      console.log(err);
    } else {
      this.setState({
        outfit: storageData,
      });
    }
  });
}

checkLocalStorage (cb) {
  var outfitList = [];
  var myStorage = window.localStorage;
  var productIds = Object.keys(myStorage);
  if (productIds.length > 0) {
    for (var productId of productIds) {
      outfitList.push(JSON.parse(myStorage.getItem(productId)));
    };
    cb (null, outfitList);
  } else {
    cb('NO ITEMS IN LOCAL STORAGE!', null);
  }
}

fillCarousels (productId) {
  var currentProduct;
  var relatedProducts = [];
  this.setState({
    related: [],
    productData: ''
  });
  this.createProductObj(productId, (err, productObj) => {
    this.setState({
      productData: productObj
    });
    for (var relatedId of this.state.productData.related) {
      if (relatedId !== this.state.productId) {
        this.createProductObj(relatedId, (err, relatedProductObj) => {
          if (err) {
            console.log('ERROR creating relatedProductObj: ', err);
          } else {
            relatedProducts = this.state.related;
            relatedProducts.push(relatedProductObj);
            this.setState({
              related: relatedProducts
            });
          }
        });
      }
    }
  })
}

createProductObj (productId, cb) {
  var productObj;
  axios({
    baseURL: 'http://localhost:3000',
    url: '/productData',
    method: 'get',
    params: {productId: productId}
  })
  .then(results => {
    productObj = results.data;
    return productObj;
  })
  .then(productObj => {
    axios({
      baseURL: 'http://localhost:3000',
      url: '/addRatingsData',
      method: 'get',
      params: {productId: productObj.id}
    })
    .then(ratingsData => {
      productObj.ratings = ratingsData.data;
      return productObj;
    })
    .then(productObj => {
      axios({
        baseURL: 'http://localhost:3000',
        url: '/addRelatedData',
        method: 'get',
        params: {productId: productObj.id}
      })
      .then(relatedData => {
        var uniqueRelatedData = [...new Set(relatedData.data)];
        productObj.related = uniqueRelatedData;
        return productObj;
      })
      .then(productObj => {
        axios({
          baseURL: 'http://localhost:3000',
          url: '/addImageData',
          method: 'get',
          params: {productId: productObj.id}
        })
        .then(imageData => {
          var defaultFound = false;
          var imageUrl,
              originalPrice,
              styleId,
              salePrice;

          for (var style of imageData.data.results) {
            if (style['default?']) {
              defaultFound = true;
              productObj.styleId = style.style_id;
              productObj.imageUrl = style.photos[0].url;
              productObj.originalPrice = style.original_price;
              productObj.salePrice = style.sale_price;
            }
          }
          if (!defaultFound) {
            productObj.styleId = imageData.data.results[0].styleId;
            productObj.imageUrl = imageData.data.results[0].photos[0].url;
            productObj.originalPrice = imageData.data.results[0].original_price;
            productObj.salePrice = imageData.data.results[0].sale_price;
          }
          return productObj;
        })
      .then(productObj => {
        cb(null, productObj);
      })
      })
    })
  })
}

  addOutfitItem (event) {
    var newOutfit = this.state.outfit;
    for ( var index = 0; index < newOutfit.length; index ++ ) {
      if (newOutfit[index].id === this.state.productId) {
        console.log('Item already in outfit. Item #', newOutfit[index].id);
        return;
      }
    }
    localStorage.setItem(this.state.productData.id, JSON.stringify(this.state.productData));
    newOutfit.push(this.state.productData);
    this.setState ({
      outfit: newOutfit
    });
  }

  removeOutfitItem (productId) {
    localStorage.removeItem(productId);
    var newOutfit = [];
    var outfit = this.state.outfit;
    for (var product of outfit) {
      if (product.id !== productId) {
        newOutfit.push(product);
      }
    }
    this.setState ({
      outfit: newOutfit
    });
  }

  changeId (productId) {
    console.log('new product id: ', productId);
    this.setState ({
      productId: productId
    });
    this.fillCarousels(productId);
  }

  render() {
    return(
      <div id='comparison'>
        <div className='relatedTitle' >RELATED PRODUCTS</div>
        <Related  relatedProducts={this.state.related}
                  currProductData={this.state.productData}
                  changeId={this.changeId} />
        <div className='outfitTitle'>YOUR OUTFIT</div>
        <Outfit outfit={this.state.outfit}
                addOutfitItem={this.addOutfitItem}
                removeOutfitItem={this.removeOutfitItem} />
      </div>
    )
  }

}

export default Comparison;