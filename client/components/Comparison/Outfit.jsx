import React from 'react';
import FontAwesome from 'react-icons/fa';

const OutfitItem = (props) => {
  return (
    <div className='listItem'>
      <div className='relatedImgBtn'>
        <img className='carouselImg' src='https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'></img>
      </div>
      <div className='category'>CATEGORY</div>
      <div className='productName'>Expanded Product Name with Extra Text</div>
      <div className='price'>$123</div>
      <div className='rating'>XXXXX</div>
    </div>
  );
}

const Outfit = (props) => {
  var outfitList = [];
  var productIds = Object.keys(props.outfit);
  for (var productId of productIds) {
    outfitList.push(props.outfit.getItem(productId));
  };
  // console.log('OUTFIT LIST: ', outfitList);
  var outfits = outfitList.map((item) =>
    <OutfitItem key={item.id} id={item.id} category={item.category} name={item.name} price={item.default_price} image={item.productImg} />
  )
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