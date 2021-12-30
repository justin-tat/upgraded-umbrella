import React from 'react';
import StyleRow from './StyleRow.jsx';


var StyleList = (props) => {
    return(<div id="styleList">
        {props.styles.map((styleRow, rowIndex) => {
            return <StyleRow styleRow={styleRow} key={styleRow[0].thumbnail_url} updateStyle={props.updateStyle} currStyle={props.currStyle} rowIndex={rowIndex}/>
        })}
    </div>)
    
}

export default StyleList;