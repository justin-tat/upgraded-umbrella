import React from 'react';

var AddToCart = props => {
    return (
        <div id="cartAndStar">
            <div id="cart" onClick={props.updateCart}>
                <div className="cartElem">ADD TO CART</div>
                <div className="cartElem">+</div>
            </div>
            {props.favorited === true 
            ? <img src='./img/favoriteStar.png' id="faveStar" onClick={props.toggleFavorite}></img>
            : <img src='./img/notFavoriteStar.png' id="faveStar" onClick={props.toggleFavorite}></img>
            }
        </div>
    )
}



export default AddToCart;