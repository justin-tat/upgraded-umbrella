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
      productId: 59553
    }
  }

  componentDidMount () {
    this.storeRelatedItems(this.state.productId, (err, allProductObjs) => {
      this.setState({
        related: allProductObjs
      });
    });
  }

  pullItemImages (itemId, cb) {
    console.log('This is the item value in pullItemImages: ', itemId);
    $.get({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${itemId}/styles/`,
      headers: {
        'Authorization': `${API_Token.API_Token}`
      }
    }, (data) => {
      console.log('Data pulled when looking for images: ', data.results);
      var imageData = data.results[0].photos[0];
      if (imageData.url === null) {
        imageData.url = 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80';
      }
      console.log('Image Data: ', imageData.url);
      cb(null, {itemId: itemId, imageData: imageData.url});
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
                      product.productImg = imageData.imageData;
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

  updateOutfit (productId) {
    console.log('Your outfit is being updated!');
    var myStorage = window.localStorage;
    myStorage[productId] = 'stuff';
    console.log(myStorage);
    localStorage.clear();
    console.log(myStorage);
  }



  render() {
    return(
      <div>
        <h2>Related Items and Comparison Modal</h2>
        <p>RELATED PRODUCTS</p>
        <Related relatedData={this.state.related} />
        <p>YOUR OUTFIT</p>
        <Outfit updateOutfit={this.updateOutfit.bind(this)} outfit={this.state.outfit}/>
      </div>
    )
  }
}

export default Comparison;