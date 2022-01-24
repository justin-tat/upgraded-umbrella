import React from 'react';

var ThumbnailList = (props) => {
    return(
        <div id="thumbnailList">
            {
                props.photos[0].url === props.allPhotos[0].url && props.currPhotoIndex === 0
                    ? <div></div>
                    : <div> <img src="./img/photoIndexupArrow.png" key="upArrow" id="upPhotoArrow" onClick={props.arrowClick} alt="upArrow"></img> </div>
            }
            {props.photos.map((urls, i) => {
                if(i === props.currPhotoIndex) {
                    return(
                    <div key={urls.thumbnail_url}>
                        <img className="thumbnail selected" src={urls.thumbnail_url} onClick={props.photoClick} alt="selected thumbnail"></img>
                    </div>)
                }
                return(
                    <div key={urls.thumbnail_url}>
                        <img className="thumbnail" src={urls.thumbnail_url} onClick={props.photoClick} alt="thumbnail" ></img>
                    </div>)
                }
            )}
            {
                props.photos[props.photos.length - 1].url === props.allPhotos[props.allPhotos.length - 1].url && props.currPhotoIndex === props.photos.length - 1
                    ? <div></div>
                    : <div> <img src="./img/photoIndexDownArrow.png" key="downArrow" id="downPhotoArrow" onClick={props.arrowClick} alt="downArrow"></img> </div>
            }
        </div>
    )
}

export default ThumbnailList;
