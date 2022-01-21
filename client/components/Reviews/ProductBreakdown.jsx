import React from 'react';

var ProductBreakdown = (props) => {
  return(<>
    <div className='product-breakdown'>
      <input type="range" list="tickmarks"></input>
      <datalist id="tickmarks">
      <option value="0" label="0%"></option>
      <option value="10"></option>
      <option value="20"></option>
      <option value="30"></option>
      <option value="40"></option>
      <option value="50" label="50%"></option>
      <option value="60"></option>
      <option value="70"></option>
      <option value="80"></option>
      <option value="90"></option>
      <option value="100" label="100%"></option>
      </datalist>
    </div>
  </>)}

export default ProductBreakdown;