import React from 'react';
import Price from './Price.jsx';
import Plus from './ComparisonImages/plusImg.png';
import xImg from './ComparisonImages/xIcon.png';
import NoImage from './ComparisonImages/noImage.png';
import Ratings from './Ratings.jsx';

const OutfitItem = (props) => {
  var image = props.image ? props.image : NoImage;
  var salePrice,
      originalPrice,
      redFont;

  return (
    <div className='listItem' >
      <div className='relatedImgBox' >
        <img className='relatedImg' src={image}></img>
        <img className='xImg' src={xImg} onClick={() => {props.removeOutfitItem(props.id)}} ></img>
      </div>
      <div className='relatedDetails'>
        <div className='category'>{props.category}</div>
        <div className='productName'>{props.name}</div>
        <Price salePrice={props.salePrice} originalPrice={props.originalPrice} />
        <Ratings ratings={props.ratings} />
      </div>
    </div>
  );
}

const Outfit = (props) => {
  console.log('OUTFIT PROPS: ', props);
  var outfits = <div></div>;
  if (props.outfit !== undefined && (props.outfit).length > 0) {
    var outfits = (props.outfit).map((product) =>
      <OutfitItem key={product.id}
                  id={product.id}
                  category={product.category}
                  name={product.name}
                  salePrice={product.salePrice}
                  originalPrice={product.originalPrice}
                  image={product.imageUrl}
                  ratings={product.ratings}
                  removeOutfitItem={props.removeOutfitItem} />
    )
  }
  return (
      <div id='outfit' className='scrollWrapper'>
        <br></br>
        <div id='outfitCarousel'>
          <div className='addItem' onClick={() => {props.addOutfitItem(props.currProductData)}}>
          <img className='plusImage' src={Plus} />
          <div className='addToOutfit' >Add To Outfit</div>
          </div>
          {outfits}
        </div>
      </div>
    )
}

export default Outfit;