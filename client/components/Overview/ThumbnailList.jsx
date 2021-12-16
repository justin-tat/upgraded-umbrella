import React from 'react';
import Thumbnail from './Thumbnail.jsx';

var ThumbnailList = (props) => {
    return(
        <div id="thumbnailList">
            {props.photos.map(urls => {
                return <Thumbnail key={urls.thumbnail_url} url={urls.thumbnail_url} />
            })}
        </div>
    )
}

export default ThumbnailList;