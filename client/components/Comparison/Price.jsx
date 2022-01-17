import React from 'react';


const Price = (props) => {
  var salePrice,
      originalPrice,
      redFont;

  if (props.salePrice) {
    salePrice = `$${props.salePrice}`;
    originalPrice = `$${props.originalPrice}`;
    redFont = {color: 'red'};
  } else {
    salePrice = `$${props.originalPrice}`;
  }

  return (
    <div className='compPrice'>
      <div className='salePrice' style={redFont}>{salePrice}</div>
      <div className='originalPrice'> {originalPrice}</div>
    </div>
  )
}

export default Price;
