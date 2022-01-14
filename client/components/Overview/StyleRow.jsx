import React from 'react';
import Style from './Style.jsx';

var StyleRow = (props) => {

    return(
    <div className="styleRow">
        {props.styleRow.map((url, styleIndex) => {
            return <Style image={url.thumbnail_url} 
            key={url.url} 
            updateStyle={props.updateStyle} 
            currStyle={props.currStyle} 
            rowIndex={props.rowIndex} 
            styleIndex={styleIndex}/>
        })}
    </div>);
}

export default StyleRow;