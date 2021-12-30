import React from 'react';

var AddToCart = props => {
    return (
        <div id="cart" onClick={props.updateCart}>
            <div className="cartElem">ADD TO CART</div>
            <div className="cartElem">+</div>
        </div>
    )
}

export default AddToCart;