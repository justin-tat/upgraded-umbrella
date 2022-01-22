import React from 'react';

var ProductBreakdown = (props) => {
  return(<>
    <div className='product-breakdown'>
      <label htmlFor={props.name}>{props.name}</label>
      <meter
        className='product-breakdown-bar'
        id={props.name}
        value={props.value}
        min='1'
        max='5'>
      </meter>
    </div>
  </>)}

export default ProductBreakdown;