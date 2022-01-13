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
      console.log('THIS IS THE STATE: ', this.state);
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
  this.createProductObj(productId, (err, productObj) => {
    console.log('Created Product Obj: ', productObj);
    this.setState({
      productData: productObj
    });
    for (var relatedId of productObj.related) {
      console.log('Iterated related Id: ', relatedId);
      this.createProductObj(relatedId, (err, relatedProductObj) => {
        if (err) {
          console.log('ERROR: ', err);
        } else {
          console.log('Created Related Product Obj: ', relatedProductObj);
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
    console.log('Pulled Product Data: ', productData);
    productObj = productData;
    $.get({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta/?product_id=${productId}`,
      headers: {
        'Authorization': `${API_Token.API_Token}`
      }
    }, (ratingsData) => {
      console.log('Pulled Ratings Data: ', ratingsData);
      productObj.ratings = ratingsData.ratings;
      $.get({
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productId}/related/`,
        headers: {
          'Authorization': `${API_Token.API_Token}`
        }
      }, (relatedData) => {
        console.log('Pulled Related Data: ', relatedData);
        productObj.related = relatedData;
        $.get({
          url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productId}/styles/`,
          headers: {
            'Authorization': `${API_Token.API_Token}`
          }
        }, (imageData) => {
          console.log('Pulled Image Data: ', imageData);
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
    console.log('Removing item: ', productId);
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
      <div>
        <h2>Related Items and Comparison Modal</h2>
        <p>RELATED PRODUCTS</p>
        <Related  relatedProducts={this.state.related}
                  currProductData={this.state.productData}/>
        <p>YOUR OUTFIT</p>
        <Outfit outfit={this.state.outfit}
                addOutfitItem={this.addOutfitItem}
                removeOutfitItem={this.removeOutfitItem} />
      </div>
    )
  }

}

export default Comparison;