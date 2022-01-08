import React, {useState} from 'react';
import ComparisonModal from './ComparisonModal.jsx';
import NoImage from './ComparisonImages/noImage.png';

const RelatedItem = (props) => {
  // console.log('Related Item Props: ', props);
  var productData;
  var [show, setShow] = useState(false);
  var image = props.image;
  if (props.image === null || props.image === undefined) {
    image = NoImage;
  }
  for (var product of props.relatedData) {
    if (product.id === props.productId) {
      productData = product;
    }
  }
  // console.log('ProductData: ', productData);
  //adjust price display depending on sale
  return (
    <div className='listItem' >
      <div className='relatedItemBox' onClick={() => setShow(true)}>
        <img className='relatedImg' src={image}></img>
        <div className='relatedDetails'>
          <div className='category'>{props.category}</div>
          <div className='productName'>{props.name}</div>
          <div className='price'>${props.price}</div>
          <div className='rating'>XXXXX</div>
        </div>
      </div>
      <ComparisonModal relatedData={productData} show={show} onClose={() => setShow(false)} show={show}/>

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