import React from 'react';
import jquery from 'jquery';
import $ from 'jquery';
import Related from './Comparison/Related.jsx';
import Outfit from './Comparison/Outfit.jsx';
import ComparisonModal from './Comparison/ComparisonModal.jsx';
import overviewProducts from '../exampleData/OverviewData.js';
import styles from '../exampleData/OverviewData.js';
import API_Token from '../config/apiKey.js';

class Comparison extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfit: [],
      related: [],
      productId: 59556,
      productData: {}
    }
  }

  componentDidMount () {
    // localStorage.clear();
    this.storeRelatedItems(this.state.productId, (err, allProductObjs) => {
      this.setState({
        related: allProductObjs
      });
    });
    this.checkLocalStorage((err, storageData) =>{
      if (err) {
        console.log(err);
      } else {
        this.setState({
          outfit: storageData
        })
      }
    });
    this.pullProductInfo(this.state.productId, (err, productInfo) => {
      if (err) {
        console.log(err);
      } else {
        this.setState ({
          productData: productInfo
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
      console.log(outfitList);
      console.log(myStorage);
      cb (null, outfitList);
    } else {
      cb('NO ITEMS IN LOCAL STORAGE!', null);
    }
  }

  pullItemImages (itemId, cb) {
    $.get({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${itemId}/styles/`,
      headers: {
        'Authorization': `${API_Token.API_Token}`
      }
    }, (data) => {
      var defaultFound = false;
      var imageUrl,
          itemData,
          originalPrice,
          styleId,
          salePrice;
      for (var style of data.results) {
        if (style['default?']) {
          defaultFound = true;
          styleId = style.style_id;
          imageUrl = style.photos[0].url;
          originalPrice = style.original_price;
          salePrice = style.sale_price;
        }
      }
      if (!defaultFound) {
        styleId = data.results[0].styleId;
        imageUrl = data.results[0].photos[0].url;
        originalPrice = data.results[0].original_price;
        salePrice = data.results[0].sale_price;
      }
      itemData = {itemId, styleId, imageUrl, originalPrice, salePrice};
      cb(null, itemData);
    }
  )}

  pullRelatedItems (itemId, cb) {
    $.get({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${itemId}/related/`,
      headers: {
        'Authorization': `${API_Token.API_Token}`
      }
    }, (data) => {
      cb(null, data);
    })
  }

  pullProductInfo (itemId, cb) {
    $.get({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${itemId}/`,
      headers: {
        'Authorization': `${API_Token.API_Token}`
      }
    }, (productInfo) => {
        cb(null, productInfo);
    })
  }

  storeRelatedItems (itemId, cb) {
    var allProductObjs = [];
    this.pullRelatedItems(itemId, (err, relatedItems) => {
      if (err) {
        console.log('ERROR: ', err);
      } else {
        for (var item of relatedItems) {
          this.pullProductInfo(item, (err, productInfo) => {
            if (err) {
              console.log('ERROR: ', err);
            } else {
              allProductObjs.push(productInfo);
              itemId = productInfo.id;
              this.pullItemImages(itemId, (err, imageData) => {
                if (err) {
                  console.log(err);
                } else {
                  itemId = imageData.itemId;
                  for (var product of allProductObjs) {
                    if (product.id === itemId) {
                      product.productImg = imageData.imageUrl;
                      product.styleId = imageData.styleId;
                      product.originalPrice = imageData.originalPrice;
                      product.salePrice = imageData.salePrice;
                      console.log(product);
                      cb(null, allProductObjs);
                    }
                  }
                }
              })
            }
          });
        }
      }
    });
  }

  updateOutfit (event) {
    var outfitObj = {};
    console.log('Your outfit is being updated!');
    for (var item of this.state.outfit) {
      if (item.id === this.state.productId) {
        return;
      }
    }
    this.pullProductInfo(this.state.productId, (err, productInfo) => {
      if (err) {
        console.log(err);
      } else {
        outfitObj = productInfo;
        this.pullItemImages(productInfo.id, (err, imageData) => {
          if (err) {
            console.log(err);
          } else {
            var newOutfit = this.state.outfit;
            outfitObj.productImg = imageData.imageUrl;
            outfitObj.styleId = imageData.styleId;
            outfitObj.originalPrice = imageData.originalPrice;
            outfitObj.salePrice = imageData.salePrice;
            console.log('Image Data in outfitObj: ', outfitObj);
            localStorage.setItem(outfitObj.id, JSON.stringify(outfitObj));
            newOutfit.push(outfitObj);
            this.setState ({
              outfit: newOutfit
            });
          }
        });
      }
    });
  }

  removeOutfitItem (productId) {
    console.log('REMOVING OUTFIT ITEM!');
    console.log('Removing item: ', productId);
    localStorage.removeItem(productId);
    var outfitItems = this.state.outfit;
    var newOutfit = [];
    for (var item of outfitItems) {
      if (item.id !== productId) {
        newOutfit.push(item);
      }
    }
    this.setState ({
      outfit: newOutfit
    });
  }


  render() {
    return(
      <div>
        <h2>Related Items and Comparison Modal</h2>
        <p>RELATED PRODUCTS</p>
        <Related relatedData={this.state.related} currProductData={this.state.productData}/>
        <p>YOUR OUTFIT</p>
        <Outfit updateOutfit={this.updateOutfit.bind(this)} outfit={this.state.outfit} removeOutfitItem={this.removeOutfitItem.bind(this)} />
      </div>
    )
  }
}

export default Comparison;