import React from 'react';


var Thumbnail = (props) => {
    return(
        <div>
            <img className="thumbnail" src={props.url} ></img>
        </div>
    )
}

export default Thumbnail;