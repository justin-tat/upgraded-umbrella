import React from 'react';
import FontAwesome from 'react-icons/fa';

const OutfitItem = (props) => {
  return (
    <div className='listItem' >
      <div className='relatedImgBtn' onClick={() => {props.removeOutfitItem(props.id)}}>
        <img className='carouselImg' src={props.image}></img>
      </div>
      <div className='category'>{props.category}</div>
      <div className='productName'>{props.name}</div>
      <div className='price'>{props.price}</div>
      <div className='rating'>XXXXX</div>
    </div>
  );
}

const Outfit = (props) => {
  var outfitList = props.outfit;
  if (outfitList.length > 0) {
    console.log('outfit list: ', outfitList);
    var outfits = outfitList.map((item) =>
      <OutfitItem key={item.id} id={item.id} category={item.category} name={item.name} price={item.default_price} image={item.productImg} removeOutfitItem={props.removeOutfitItem} />
    )
  }
  return (
      <div className='scrollWrapper'>
        <br></br>
        <div id='carousel'>
          <div className='addItem' onClick={props.updateOutfit}>
          {/* <script src="https://kit.fontawesome.com/17353c3ded.js" crossOrigin="anonymous"></script> */}
          <h4 className='addToOutfit' >Add To Outfit</h4>
          </div>
          {outfits}
        </div>
      </div>
    )
}

export default Outfit;