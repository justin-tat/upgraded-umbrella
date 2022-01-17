import React from 'react';

var ThumbnailList = (props) => {
    return(
        <div id="thumbnailList">
            {
                props.currPhotoIndex !== 0 
                    ? <div> <img src="./img/photoIndexUpArrow.png" key="upArrow" id="upPhotoArrow" onClick={props.arrowClick}></img> </div>
                    : <div></div>
            }
            {props.photos.map((urls, i) => {
                if(i === props.currPhotoIndex) {
                    return(
                    <div key={urls.thumbnail_url}>
                        <img className="thumbnail selected" src={urls.thumbnail_url} onClick={props.photoClick} ></img>
                    </div>)
                }
                return(
                    <div key={urls.thumbnail_url}>
                        <img className="thumbnail" src={urls.thumbnail_url} onClick={props.photoClick} ></img>
                    </div>)
                }
            )}
            {
                props.currPhotoIndex === props.photos.length - 1
                    ? <div></div>
                    : <div> <img src="./img/photoIndexDownArrow.png" key="downArrow" id="downPhotoArrow" onClick={props.arrowClick}></img> </div>
            }
        </div>
    )
}

export default ThumbnailList;