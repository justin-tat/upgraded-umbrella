import React from 'react';

var SellingPoints = props => {
    return(
    <div id="productDescription">
        <h3>{props.productOverview.slogan}</h3>
        <div>{props.productOverview.description}</div>
    </div>)
}

export default SellingPoints;