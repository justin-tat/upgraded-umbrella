import React from 'react';
import ThumbnailList from './ThumbnailList.jsx';
import ProductInfo from './ProductInfo.jsx';

var DefaultView = (props) => {
    return (
        <div id="defaultView">
            {props.currPhotoIndex !== 0
                ? <img src="./img/leftArrow.png" id="leftArrow" onClick={props.arrowClick}></img>
                : <div></div>}
            <div id="defaultViewImages">
                <img id="mainImage" src={props.photos[props.currPhotoIndex].url} onClick={props.zoom}></img>
                <ThumbnailList photos={props.photos}
                photoClick={props.photoClick}
                arrowClick={props.arrowClick}
                currPhotoIndex={props.currPhotoIndex}
                />
            </div>
            {props.currPhotoIndex !== props.allPhotos.length - 1
                ? <div> <img src="./img/rightArrow.png" id="rightArrow" onClick={props.arrowClick}></img> </div>
                : <div></div>}
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