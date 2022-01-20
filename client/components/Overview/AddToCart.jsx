import React from 'react';

var AddToCart = props => {
    return (
        <div id="cartAndStar">
            <div id="cart" onClick={props.updateCart}>
                <div className="cartElem">ADD TO CART</div>
                <div className="cartElem">+</div>
            </div>
            <img src='./img/notFavoriteStar.png' id="faveStar"></img>
        </div>
    )
}



export default AddToCart;