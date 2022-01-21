import React from 'react';
import Zoom from './Zoom.jsx';
import ProductInfo from './ProductInfo.jsx';

var ExpandedView = (props) => {
    return (
        <div id="expandedView">
            <div id="expandedViewImages">
                <img src="./img/expandedToDefault.png" 
                    className="revertToExpanded" 
                    onClick={props.revertToExpanded}></img>
                {props.currPhotoIndex !== 0 && props.zoomedIn === false
                    ? <img src="./img/leftArrow.png" id="expandedLeftArrow" onClick={props.arrowClick}></img>
                    : <div></div>
                }
                {props.zoomedIn === false
                    ? <img id="expandedImg" onLoad={props.onImgLoad} src={props.photos[props.currPhotoIndex].url} onClick={props.zoom} style={props.expViewImg} ></img>
                    : <Zoom img={props.photos[props.currPhotoIndex].url} zoomScale={2.5} zoom={props.zoom} dimensions={props.dimensions}/>
                }

                {props.currPhotoIndex !== props.allPhotos.length - 1 && props.zoomedIn === false
                    ? <img src="./img/rightArrow.png" 
                    id="expandedRightArrow" 
                    onClick={props.arrowClick}></img>
                    : <div></div>}
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