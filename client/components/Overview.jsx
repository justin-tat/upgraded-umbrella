import React from 'react';
import DefaultView from './Overview/DefaultView.jsx';
import ExpandedView from './Overview/ExpandedView.jsx';
import SellingPoints from './Overview/SellingPoints.jsx';
import exampleData from '../exampleData/OverviewData.js';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'normal',
      results: exampleData.styles.results,
      currStyle: 0,
      currPhotoIndex: 0,
      photos: exampleData.styles.results[0].photos,
      reviewMetadata: exampleData.reviewMetadata,
      productOverview: exampleData.overviewProducts,
      zoom: 'default',
      zoomedIn: false,
      dimensions: {},
      expViewImg: {}
    };
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.photoClick = this.photoClick.bind(this);
    this.arrowClick = this.arrowClick.bind(this);
    this.updateStyle = this.updateStyle.bind(this);
    this.zoom = this.zoom.bind(this);
    this.toggleHide = this.toggleHide.bind(this);
    this.onImgLoad = this.onImgLoad.bind(this);
    this.revertToExpanded = this.revertToExpanded.bind(this);
  }

  //Make office hours about component did mount and how to avoid errors when calling nested objects in downstream components. Do you use example data, and then just override it in componentDidMount with an API call?

  toggleHide(event) {
    event.preventDefault();
    this.setState({
      hide: !this.state.hide
    });
  }

  onMouseEnter(event) {
    this.setState({
      status: 'hovered'
    })
  }

  onMouseLeave(event) {
    this.setState({
      status: 'normal'
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
      }, () => {
        //console.log("state.zoomedIn", this.state.zoomedIn);
      });
    }

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
            photos: exampleData.styles.results[i].photos
          });
        }
      }
    }
  }



  arrowClick(event) {
    event.preventDefault();
    var identity = event.target.getAttribute('src');

    if (identity === './img/photoIndexUpArrow.png' || identity === './img/leftArrow.png') {
      this.setState({
        currPhotoIndex: this.state.currPhotoIndex - 1
      });
    } else {
      this.setState({
        currPhotoIndex: this.state.currPhotoIndex + 1
      });

    }
  }



  render() {
    return (
      <div className={this.state.status} id="overview">
        <h2 onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>Overview Modal</h2>
        {this.state.zoom === 'default'
          ? <DefaultView results={this.state.results}
            currStyle={this.state.currStyle}
            currPhotoIndex={this.state.currPhotoIndex}
            photos={this.state.photos}
            reviewMetadata={this.state.reviewMetadata}
            productOverview={this.state.productOverview}
            photoClick={this.photoClick}
            arrowClick={this.arrowClick}
            updateStyle={this.updateStyle}
            zoom={this.zoom}
            toggleHide={this.toggleHide}
            hide={this.state.hide} />
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
              revertToExpanded = {this.revertToExpanded}/>
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