// import React from 'react';
// import jquery from 'jquery';
// import $ from 'jquery';
// import Related from './Comparison/Related.jsx';
// import Outfit from './Comparison/Outfit.jsx';
// import API_Token from '../config/apiKey.js';

// class Comparison extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       outfit: [],
//       related: [],
//       productId: props.productId || 59557,
//       productData: {}
//     }
//   }

//   componentDidMount () {
//     // localStorage.clear();
//     this.storeRelatedItems(this.state.productId);
//     this.checkLocalStorage((err, storageData) =>{
//       if (err) {
//         console.log(err);
//       } else {
//         this.setState({
//           outfit: storageData
//         })
//       }
//     });
//     this.pullProductInfo(this.state.productId, (err, productInfo) => {
//       if (err) {
//         console.log(err);
//       } else {
//         this.setState ({
//           productData: productInfo
//         });
//       }
//     });
//   }

//   pullProductInfoFromArray (relatedItems, cb) {
//     var allRelatedProducts = [];
//     for (var index = 0; index < relatedItems.length; index++) {
//       var itemId = relatedItems[index];
//       if (index === relatedItems.length - 1) {
//         this.pullProductInfo(itemId, (err, productInfo) => {
//           if (err) {
//             cb(err, null);
//           }
//           allRelatedProducts.push(productInfo);
//           cb(null, allRelatedProducts);
//         });
//       } else {
//         this.pullProductInfo(itemId, (err, productInfo) => {
//           if (err) {
//             cb(err, null);
//           }
//           allRelatedProducts.push(productInfo);
//         });
//       }
//     }
//   }

//   storeRelatedItems (itemId) {
//     this.pullAPIData(itemId, 'related', (err, relatedItems) => {
//       if (err) {
//         console.log('ERROR: ', err);
//       } else {
//         this.pullProductInfoFromArray(relatedItems, (err, relatedData) => {
//           if (err) {
//             console.log('ERROR: ', err);
//           } else {
//             this.setState({
//               related: relatedData
//             });
//           }
//         });
//       }
//     });
//   }

//   pullAPIData (itemId, urlExt, cb) {
//     var urls = {
//       ratings: `/reviews/meta/?product_id=${itemId}`,
//       images: `/products/${itemId}/styles/`,
//       related: `/products/${itemId}/related/`,
//       products: `/products/${itemId}/`
//     }
//     var extension = urls[urlExt];
//     $.get({
//       url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp${extension}`,
//       headers: {
//         'Authorization': `${API_Token.API_Token}`
//       }
//     }, (data) => {
//       cb(null, data);
//     });
//   }

//   checkLocalStorage (cb) {
//     var outfitList = [];
//     var myStorage = window.localStorage;
//     var productIds = Object.keys(myStorage);
//     if (productIds.length > 0) {
//       for (var productId of productIds) {
//         outfitList.push(JSON.parse(myStorage.getItem(productId)));
//       };
//       cb (null, outfitList);
//     } else {
//       cb('NO ITEMS IN LOCAL STORAGE!', null);
//     }
//   }

//   pullItemRatings (productInfo, cb) {
//     var itemId = productInfo.id;
//     this.pullAPIData(itemId, 'ratings', (err, ratingsData) => {
//       if (err) {
//         cb(err, null);
//       }
//       productInfo.ratings = ratingsData.ratings;
//       cb(null, productInfo);
//     });
//   }

//   pullItemImages (productInfo, cb) {
//     var itemId = productInfo.id;
//     this.pullAPIData(itemId, 'images', (err, imagesData) => {
//       if (err) {
//         cb(err, null);
//       }
//       var defaultFound = false;
//       var imageUrl,
//           itemData,
//           originalPrice,
//           styleId,
//           salePrice;
//       for (var style of imagesData.results) {
//         if (style['default?']) {
//           defaultFound = true;
//           productInfo.styleId = style.style_id;
//           productInfo.imageUrl = style.photos[0].url;
//           productInfo.originalPrice = style.original_price;
//           productInfo.salePrice = style.sale_price;
//         }
//       }
//       if (!defaultFound) {
//         productInfo.styleId = imagesData.results[0].styleId;
//         productInfo.imageUrl = imagesData.results[0].photos[0].url;
//         productInfo.originalPrice = imagesData.results[0].original_price;
//         productInfo.salePrice = imagesData.results[0].sale_price;
//       }
//       console.log(productInfo);
//       cb(null, productInfo);
//     });
//   }

//   pullProductInfo (itemId, cb) {
//     this.pullAPIData(itemId, 'products', (err, productInfo) => {
//       if (err) {
//         cb(err, null);
//       }
//       this.pullItemImages(productInfo, (err, productInfo) => {
//         if (err) {
//           cb(err, null);
//         }
//         this.pullItemRatings(productInfo, (err, productInfo) => {
//           if (err) {
//             cb(err, null);
//           }
//           cb(null, productInfo);
//         });
//       });
//     });
//   }



//   updateOutfit (event) {
//     for (var item of this.state.outfit) {
//       if (item.id === this.state.productId) {
//         return;
//       }
//     }
//     this.pullProductInfo(this.state.productId, (err, productInfo) => {
//       if (err) {
//         console.log(err);
//       } else {
//         var newOutfit = this.state.outfit;
//         localStorage.setItem(productInfo.id, JSON.stringify(productInfo));
//         newOutfit.push(productInfo);
//         this.setState ({
//           outfit: newOutfit
//         });
//       }
//     });
//   }

//   removeOutfitItem (productId) {
//     // var productId = event.target.value;
//     console.log('Removing item: ', productId);
//     localStorage.removeItem(productId);
//     var outfitItems = this.state.outfit;
//     var newOutfit = [];
//     for (var item of outfitItems) {
//       if (item.id !== productId) {
//         newOutfit.push(item);
//       }
//     }
//     this.setState ({
//       outfit: newOutfit
//     });
//   }


//   render() {
//     return(
//       <div>
//         <h2>Related Items and Comparison Modal</h2>
//         <p>RELATED PRODUCTS</p>
//         <Related  relatedProducts={this.state.related}
//                   currProductData={this.state.productData}/>
//         <p>YOUR OUTFIT</p>
//         <Outfit updateOutfit={this.updateOutfit.bind(this)}
//                 outfit={this.state.outfit}
//                 removeOutfitItem={this.removeOutfitItem.bind(this)} />
//       </div>
//     )
//   }
// }

// export default Comparison;