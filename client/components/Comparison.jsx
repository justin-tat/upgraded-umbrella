import React from 'react';
import jquery from 'jquery';
import $ from 'jquery';
import Related from './Comparison/Related.jsx';
import Outfit from './Comparison/Outfit.jsx';
import API_Token from '../config/apiKey.js';

class Comparison extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfit: [],
      related: [],
      productId: /*props.productId ||*/ 59553,
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
  })
  this.createProductObj(productId, (err, productObj) => {
    this.setState({
      productData: productObj
    });
    for (var relatedId of productObj.related) {
      this.createProductObj(relatedId, (err, relatedProductObj) => {
        if (err) {
          console.log('ERROR: ', err);
        } else {
          relatedProducts = this.state.related;
          relatedProducts.push(relatedProductObj);
          this.setState({
            related: relatedProducts
          });
        }
      });
    }
    });
}

createProductObj (productId, cb) {
  var productObj;
  $.get({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productId}/`,
    headers: {
      'Authorization': `${API_Token.API_Token}`
    }
  }, (productData) => {
    productObj = productData;
    $.get({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta/?product_id=${productId}`,
      headers: {
        'Authorization': `${API_Token.API_Token}`
      }
    }, (ratingsData) => {
      productObj.ratings = ratingsData.ratings;
      $.get({
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productId}/related/`,
        headers: {
          'Authorization': `${API_Token.API_Token}`
        }
      }, (relatedData) => {
        productObj.related = relatedData;
        $.get({
          url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productId}/styles/`,
          headers: {
            'Authorization': `${API_Token.API_Token}`
          }
        }, (imageData) => {
          var defaultFound = false;
          var imageUrl,
              originalPrice,
              styleId,
              salePrice;
          for (var style of imageData.results) {
            if (style['default?']) {
              defaultFound = true;
              productObj.styleId = style.style_id;
              productObj.imageUrl = style.photos[0].url;
              productObj.originalPrice = style.original_price;
              productObj.salePrice = style.sale_price;
            }
          }
          if (!defaultFound) {
            productObj.styleId = imageData.results[0].styleId;
            productObj.imageUrl = imageData.results[0].photos[0].url;
            productObj.originalPrice = imageData.results[0].original_price;
            productObj.salePrice = imageData.results[0].sale_price;
          }
          cb(null, productObj);
        });
      });
    });
  });
}

  addOutfitItem (event) {
    var newOutfit = this.state.outfit;
    for (var item=0; item < newOutfit.length; item++) {
      if (newOutfit[item].id === this.state.productId) {
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
      <div>
        <h2>Related Items and Comparison Modal</h2>
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