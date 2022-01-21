import React from 'react';
import axios from 'axios';
import DefaultView from './Overview/DefaultView.jsx';
import ExpandedView from './Overview/ExpandedView.jsx';
import SellingPoints from './Overview/SellingPoints.jsx';
import exampleData from '../exampleData/OverviewData.js';

//Create mock data structure instead of using exampleData

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: exampleData.styles.results,
      currStyle: 0,
      currPhotoIndex: 0,
      photos: exampleData.styles.results[0].photos,
      reviewMetadata: exampleData.reviewMetadata,
      productOverview: exampleData.overviewProducts,
      zoom: 'default',
      zoomedIn: false,
      dimensions: {},
      expViewImg: {},
      allPhotos: exampleData.styles.results[0].photos,
      photosIndices: {start: 0, end: 0}
    };
    this.photoClick = this.photoClick.bind(this);
    this.arrowClick = this.arrowClick.bind(this);
    this.updateStyle = this.updateStyle.bind(this);
    this.zoom = this.zoom.bind(this);
    this.onImgLoad = this.onImgLoad.bind(this);
    this.revertToExpanded = this.revertToExpanded.bind(this);
    this.parsePhotos = this.parsePhotos.bind(this);
  }

  componentDidMount() {
    this.getOverview(this.props.productId)
    .then(() => {
      console.log('Successfully set state for Overview from Atelier Data');
    })
    .catch(err => {
      console.log('Failed in ComponentDidMount of Overview.jsx', err);
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.productId !== this.props.productId) {
      this.getOverview(this.props.productId)
      .then(() => {
        console.log('Successfully set state for Overview from Atelier Data inside ComponentDidUpdate');
      })
      .catch(err => {
        console.log('Failed in ComponentDidMount of Overview.jsx', err);
      })
    }
  }

  //this.setState with prev state and previous props

  getOverview(productID) {
    return this.getProductOverview(productID)
    .then((obj) => {
      return this.getStyles(productID, obj);
    })
    .then((obj) => {
      return this.getStarReviews(productID, obj);
    })
    .then(obj => {
      return this.setState({
        productOverview: obj.productOverview,
        results: obj.results,
        photos: obj.photos,
        allPhotos: obj.allPhotos,
        currStyle: 0,
        zoom: 'default',
        reviewMetadata: obj.reviewMetadata
      })
    })
  }

  //Change to baseURL: 'http://100.24.25.169',

  getProductOverview(productID) {
    return axios({
      baseURL: 'http://localhost:3000',
      url: '/productOverview',
      method: 'get',
      params: { productID: productID }
    }).then(result => {
      let results = result.data;
      return { "productOverview": results };
    })
    .catch(err => {
      console.log('Failed inside of productOverview of client side code');
    });
  }

  getStyles(productID, obj) {
    return axios({
      baseURL: 'http://localhost:3000',
      url: '/styles',
      method: 'get',
      params: { productID: productID }
    }).then(result => {
      let styles = result.data;
      console.log("All photos", styles.results[0].photos);
      obj["results"] = styles.results;
      obj["allPhotos"] = styles.results[0].photos;
      //obj["photos"] = this.parsePhotos(styles.results[0].photos);
      obj["photos"] = this.parsePhotos(obj["allPhotos"]);
      return obj;
    })
    .catch(err => {
      console.log('Failed inside of styles of client side code');
    });
  }

  getStarReviews(productID, obj) {
    return axios({
      baseURL: 'http://localhost:3000',
      url: '/starReviews',
      method: 'get',
      params: { productID: productID }
    }).then(result => {
      let reviewMetadata = result.data;
      obj["reviewMetadata"] = reviewMetadata;
      return obj;
    })
    .catch(err => {
      console.log('Failed inside of starReviews of client side code');
    });
  }

  zoom(event) {
    event.preventDefault();
    if (this.state.zoom === 'default') {
      this.setState({
        zoom: 'expanded'
      });
    } else if (this.state.zoom === 'expanded') {
      this.setState({
        zoomedIn: !this.state.zoomedIn
      });
    }
  }

  parsePhotos(arr, modifier) {
    var indexCorrecter = modifier === undefined ? 0 : modifier;
    var endIndex = Math.min(arr.length, this.state.currPhotoIndex + 7);
    console.log("End Index of Parse Photos", endIndex);
    var startIndex = Math.max(endIndex - 7, 0);
    console.log("Start Index of Parse Photos", startIndex);
    return (arr.slice(startIndex, endIndex));
  }

  revertToExpanded(e) {
    e.preventDefault();
    this.setState({
      zoom: 'default',
      zoomedIn: false
    });
  }

  onImgLoad({ target: img }) {
    var imgAspectRatio = img.naturalWidth / img.naturalHeight;
    var windowAspectRatio = 1120 / 640;
    //When width should be set to 100%
    if (imgAspectRatio > windowAspectRatio) {
      var newHeight = 1120 / imgAspectRatio;
      this.setState({
        expViewImg: {
          imgWidth: "1120px",
          imageHeight: `${newHeight}px`,
        },
        dimensions: {
          height: img.naturalHeight,
          width: img.naturalWidth
        },
      })
      //When height should be set to 100%
    } else {
      var newWidth = 640 * imgAspectRatio;
      this.setState({
        expViewImg: {
          width: `${newWidth}px`,
          height: "640px",
        },
        dimensions: {
          height: img.naturalHeight,
          width: img.naturalWidth
        },
      })
    }
  }

  photoClick(event) {
    event.preventDefault();
    var url = event.target.getAttribute('src');
    for (var i = 0; i < this.state.photos.length; i++) {
      if (this.state.photos[i].thumbnail_url === url) {
        this.setState({
          currPhotoIndex: i
        });
      }
    }
  }

  updateStyle(event) {
    event.preventDefault();
    var url = event.target.getAttribute('src');
    for (var i = 0; i < this.state.results.length; i++) {
      if (this.state.results[i].photos[0].thumbnail_url === url) {
        if (i !== this.state.currStyle) {
          this.setState({
            currStyle: i,
            currPhotoIndex: 0,
            photos: this.state.results[i].photos
          });
        }
      }
    }
  }



  arrowClick(event) {
    event.preventDefault();
    var identity = event.target.getAttribute('src');
    var newDisplayPhotos = [];
    console.log("allPhotos from arrowClick", this.state.allPhotos);
    if (identity === './img/photoIndexUpArrow.png' || identity === './img/leftArrow.png') {
      newDisplayPhotos = this.parsePhotos(this.state.allPhotos, -1);
      this.setState({
        currPhotoIndex: this.state.currPhotoIndex - 1,
        photos: newDisplayPhotos
      });
    } else {
      newDisplayPhotos = this.parsePhotos(this.state.allPhotos, 1);
      this.setState({
        currPhotoIndex: this.state.currPhotoIndex + 1,
        photos: newDisplayPhotos
      });

    }
  }



  render() {
    return (
      <div id="overview">
        {this.state.zoom === 'default'
          ? <DefaultView
            results={this.state.results}
            currStyle={this.state.currStyle}
            currPhotoIndex={this.state.currPhotoIndex}
            photos={this.state.photos}
            reviewMetadata={this.state.reviewMetadata}
            productOverview={this.state.productOverview}
            photoClick={this.photoClick}
            arrowClick={this.arrowClick}
            updateStyle={this.updateStyle}
            zoom={this.zoom}
            hide={this.state.hide}
            productId = {this.props.productId}
            addToCarousel={this.props.appAddToCarousel}
            allPhotos = {this.state.allPhotos.length}
            />
          : <div></div>
        }
        {this.state.zoom === 'expanded'
          ?
            <ExpandedView
              //ProductInfo related
              results={this.state.results}
              currStyle={this.state.currStyle}
              updateStyle={this.updateStyle}
              reviewMetadata={this.state.reviewMetadata}
              //Expanded View related
              onImgLoad={this.onImgLoad}
              photos={this.state.photos}
              currPhotoIndex={this.state.currPhotoIndex}
              photos={this.state.photos}
              productOverview={this.state.productOverview}
              photoClick={this.photoClick}
              arrowClick={this.arrowClick}
              zoom={this.zoom}
              zoomedIn={this.state.zoomedIn}
              dimensions={this.state.dimensions}
              expViewImg = {this.state.expViewImg}
              revertToExpanded = {this.revertToExpanded}
              productId = {this.props.productId}
              addToCarousel={this.props.appAddToCarousel}
              allPhotos = {this.state.allPhotos.length}
              />
          : <div></div>
        }
        <div id="productFeatures">
          <SellingPoints productOverview={this.state.productOverview} />
          <ul id="features">
            {this.state.productOverview.features.map(obj => {
              return <li key={obj.feature}>{obj.feature + ' : ' + obj.value} </li>
            })}
          </ul>
        </div>

      </div>
    )
  }
}

export default Overview;
