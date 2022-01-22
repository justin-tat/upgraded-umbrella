import React from 'react';
import ProductInfo from './ProductInfo.jsx';

var DefaultView = (props) => {
    return (
        <div id="defaultView">
            {props.photos[0].url === props.allPhotos[0].url && props.currPhotoIndex === 0
                ? <div className="arrowFiller"></div>
                : <img src="./img/leftArrow.png" id="leftArrow" onClick={props.arrowClick}></img>
            }
            <div id="defaultViewImages">
                <img id="mainImage" src={props.photos[props.currPhotoIndex].url} onClick={props.zoom}></img>
                
            </div>
            {(props.photos[props.photos.length - 1].url === props.allPhotos[props.allPhotos.length - 1].url && props.currPhotoIndex === props.photos.length - 1)
                ? <div className="arrowFiller"></div>
                : <img src="./img/rightArrow.png" id="rightArrow" onClick={props.arrowClick}></img>
            }
            <div id="productInfo">
                <ProductInfo
                results={props.results}
                ratings={props.reviewMetadata}
                productOverview={props.productOverview}
                currStyle={props.currStyle}
                updateStyle={props.updateStyle}
                addToCarousel={props.addToCarousel}
                productId = {props.productId}
                />
            </div>
        </div>);

}

export default DefaultView;