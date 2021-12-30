import React from 'react';

var Style = (props) => {
    if ((props.rowIndex * 4) + props.styleIndex === props.currStyle) {
        return(
            <div className="styleOptionContainer selected">
            <img src={props.image} className="styleOption" onClick={props.updateStyle}></img>
        </div>
        )
    }
    return (
        <div className="styleOptionContainer">
            <img src={props.image} className="styleOption" onClick={props.updateStyle}></img>
        </div>
        
        )
}

export default Style;