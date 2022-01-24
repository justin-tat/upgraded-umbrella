import React from 'react';
import Zoom from './Zoom.jsx';
import ProductInfo from './ProductInfo.jsx';

var ExpandedView = (props) => {
    return (
        <div id="expandedView">
            <div id="expandedViewImages">
                <img src="./img/expandedToDefault.png" 
                    className="revertToExpanded" 
                    onClick={props.revertToExpanded}
                    alt="back to default"></img>
                {(props.photos[0].url === props.allPhotos[0].url && props.currPhotoIndex === 0) || props.zoomedIn === true
                    ? <div></div>
                    : <img src="./img/leftArrow.png" id="expandedLeftArrow" onClick={props.arrowClick} alt="expView leftArrow"></img>
                }
                {props.zoomedIn === false
                    ? <img id="expandedImg" onLoad={props.onImgLoad} src={props.photos[props.currPhotoIndex].url} onClick={props.zoom} style={props.expViewImg} alt="expView mainImage" ></img>
                    : <Zoom img={props.photos[props.currPhotoIndex].url} zoomScale={2.5} zoom={props.zoom} dimensions={props.dimensions}/>
                }

                {(props.photos[props.photos.length - 1].url === props.allPhotos[props.allPhotos.length - 1].url && props.currPhotoIndex === props.photos.length - 1) || props.zoomedIn === true
                    ? <div></div>
                    : <img src="./img/rightArrow.png" 
                    id="expandedRightArrow" 
                    onClick={props.arrowClick}
                    alt="expView rightArrow"></img>}
            </div>
            <div id="productInfo">
                <ProductInfo 
                results={props.results} 
                ratings={props.reviewMetadata} 
                productOverview={props.productOverview} 
                currStyle={props.currStyle} 
                updateStyle={props.updateStyle}
                addToCarousel={props.addToCarousel}/>
            </div>
        </div>
    )
}
export default ExpandedView;