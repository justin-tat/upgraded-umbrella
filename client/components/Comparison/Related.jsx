import React, {useState} from 'react';
import ComparisonModal from './ComparisonModal.jsx';

const RelatedItem = (props) => {
  // console.log('Related Item Props: ', props.image);
  var [show, setShow] = useState(false);
  return (
    <div className='listItem' >
      <div className='relatedImgBox' onClick={() => setShow(true)}>
        <img className='relatedImg' src={props.image}></img>
      </div>
      <ComparisonModal show={show} onClose={() => setShow(false)} show={show}/>
      <div className='category'>{props.category}</div>
      <div className='productName'>{props.name}</div>
      <div className='price'>${props.price}</div>
      <div className='rating'>XXXXX</div>
    </div>
  );
}

const Related = (props) => {
  var relatedList = props.relatedData;
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