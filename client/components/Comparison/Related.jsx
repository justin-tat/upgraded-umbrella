import React from 'react';
import ComparisonModal from './ComparisonModal.jsx';

const RelatedItem = (props) => {
  // console.log('Related Item Props: ', props.image);
  return (
    <div className='listItem' >
      <div className='relatedImgBtn'>
        <ComparisonModal/>
        <img className='carouselImg' src={props.image}></img>
      </div>
      <div className='category'>{props.category}</div>
      <div className='productName'>{props.name}</div>
      <div className='price'>{props.price}</div>
      <div className='rating'>XXXXX</div>
    </div>
  );
}

const Related = (props) => {
  // console.log('From Related Data: ', props.relatedData);
  var relatedList = props.relatedData;
  // console.log('RelatedList: ', relatedList);
  var relatedItems = relatedList.map((item) =>
    <RelatedItem key={item.id} productId={item.id} displayModal={props.displayModal} category={item.category} name={item.name} price={item.default_price} image={item.productImg}/>
  );
  return(
      <div className='scrollWrapper'>
        <div id='carousel'>
          {relatedItems}
        </div>
      </div>
    )
}


export default Related;