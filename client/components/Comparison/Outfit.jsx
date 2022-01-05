import React from 'react';

const OutfitItem = (props) => {
  return (
    <div className='listItem'>
      <img className='carouselImg' src='https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'></img>
      <div className='category'>CATEGORY</div>
      <div className='productName'>Expanded Product Name with Extra Text</div>
      <div className='price'>$123</div>
      <div className='rating'>XXXXX</div>
    </div>
  );
}

const Outfit = (props) => {
  var outfitList = props.outfit;
  var outfits = outfitList.map((item) =>
    <OutfitItem key={item.id} id={item.id} category={item.category} name={item.name} price={item.default_price} image={item.productImg} />
  )
  return (
      <div className='scrollWrapper'>
        <br></br>
        <div id='carousel'>
          <div className='listItem' onClick={props.updateOutfit}>
          <i className="fas fa-plus"></i>
          </div>
          {outfits}
        </div>
      </div>
    )
}

export default Outfit;