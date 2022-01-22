import React from 'react';
import axios from 'axios';
import Related from './Comparison/Related.jsx';
import Outfit from './Comparison/Outfit.jsx';
import 'regenerator-runtime/runtime';

class Comparison extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfit: [],
      related: [],
      productId: this.props.productId || 59554,
      productData: {},
      changeId: this.props.changeId
      }
    this.addOutfitItem = this.addOutfitItem.bind(this);
    this.removeOutfitItem = this.removeOutfitItem.bind(this);
    this.createProductObj = this.createProductObj.bind(this);
  }

componentDidMount() {
  // localStorage.clear();
  console.log('Props.productId: ', this.props.productId);
  this.fillCarousels(this.state.productId);
}

componentDidUpdate(prevProps) {
  if (prevProps.productId !== this.props.productId) {
    this.setState({
      related: []
    })
    this.fillCarousels(this.props.productId)
    console.log('Successfully set state for Comparison from Atelier Data inside ComponentDidUpdate');
  }
}

checkLocalStorage (cb) {
  var outfitList = [];
  var myStorage = window.localStorage;
  console.log('This is in local storage: ', myStorage);
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
  var relatedProductIds = [];
  var relatedProductObjs = [];
  var currentProduct,
      storage;

  this.checkLocalStorage((err, storageData) =>{
    if (err) {
      console.log(err);
    } else {
      storage = storageData;
    }
  });

  this.createProductObj(productId, (err, productObj) => {
    console.log('Product Obj: ', productObj);
    relatedProductIds = productObj.related;

    for (var index = 0; index <= relatedProductIds.length - 1; index ++) {
        this.createProductObj(relatedProductIds[index], (err, relatedProductObj) => {
          relatedProductObjs = this.state.related;
          relatedProductObjs.push(relatedProductObj);
          this.setState({
            productData: productObj,
            related: relatedProductObjs,
            outfit: storage || []
          });
        })
    }
  });
}


createProductObj (productId, cb) {
  var productObj;
  axios({
    baseURL: 'http://localhost:3000',
    url: '/productData',
    method: 'get',
    params: {productId: productId}
  }).then(results => {
    productObj = results.data;
    return productObj;
  }).then(productObj => {
    return axios({
      baseURL: 'http://localhost:3000',
      url: '/addRatingsData',
      method: 'get',
      params: {productId: productObj.id}
    });
  }).then(ratingsData => {
    productObj.ratings = ratingsData.data;
    return productObj;
  }).then(productObj => {
    return axios({
      baseURL: 'http://localhost:3000',
      url: '/addRelatedData',
      method: 'get',
      params: {productId: productObj.id}
    });
  }).then(relatedData => {
    var uniqueRelatedData = [...new Set(relatedData.data)];
    var index = uniqueRelatedData.indexOf(productObj.id);
    if (index > -1) {
      uniqueRelatedData.splice(index, 1);
    }
    productObj.related = uniqueRelatedData;
    return productObj;
  }).then(productObj => {
    return axios({
      baseURL: 'http://localhost:3000',
      url: '/addImageData',
      method: 'get',
      params: {productId: productObj.id}
    });
  }).then(imageData => {
    console.log('IMAGE DATA: ', imageData);
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
  }).then(productObj => {
    cb(null, productObj);
  });
}

  addOutfitItem (productData) {
    console.log('product data to be added to outfit: ', productData);
    var newOutfit = this.state.outfit;
    var indexFound = false;
    for ( var index = 0; index < newOutfit.length; index ++ ) {
      if (newOutfit[index].id === productData.id) {
        console.log('Item already in outfit. Item #', newOutfit[index].id);
        indexFound = true;
      }
    }
    if (!indexFound) {
      localStorage.setItem(productData.id, JSON.stringify(productData));
      newOutfit.push(productData);
      this.setState ({
        outfit: newOutfit
      });
    }
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

  render() {
    return(
      <div id='comparison'>
        <div className='relatedTitle' >RELATED PRODUCTS</div>
        <Related  relatedProducts={this.state.related}
                  currProductData={this.state.productData}
                  changeId={this.props.changeId}
                  features={this.state.productData.features} />
        <div className='outfitTitle'>YOUR OUTFIT</div>
        <Outfit outfit={this.state.outfit}
                currProductData={this.state.productData}
                addOutfitItem={this.addOutfitItem}
                removeOutfitItem={this.removeOutfitItem} />
      </div>
    )
  }
}

export default Comparison;