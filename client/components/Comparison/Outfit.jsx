import React from 'react';
import FontAwesome from 'react-icons/fa';

const OutfitItem = (props) => {
  return (
    <div className='listItem' >
      <div className='relatedImgBox' onClick={() => {props.removeOutfitItem(props.id)}}>
        <img className='relatedImg' src={props.image}></img>
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
          <img className='plusImage' src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/1200px-Plus_symbol.svg.png' />
          <div className='addToOutfit' >Add To Outfit</div>
          </div>
          {outfits}
        </div>
      </div>
    )
}

export default Outfit;