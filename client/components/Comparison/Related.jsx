import React, {useState} from 'react';
import ComparisonModal from './ComparisonModal.jsx';
import NoImage from './ComparisonImages/noImage.png';

const RelatedItem = (props) => {
  // console.log('Related Item Props: ', props.image);
  var [show, setShow] = useState(false);
  var image = props.image;
  if (props.image === null || props.image === undefined) {
    image = NoImage;
  }
  //here is where you need to pull the item features to display them in the modal
  return (
    <div className='listItem' >
      <div className='relatedImgBox' onClick={() => setShow(true)}>
        <img className='relatedImg' src={image}></img>
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
    <RelatedItem key={item.id} productId={item.id} relatedData={props.relatedData} displayModal={props.displayModal} category={item.category} name={item.name} price={item.default_price} image={item.productImg}/>
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