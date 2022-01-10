import React, {useState} from 'react';
import ComparisonModal from './ComparisonModal.jsx';
import NoImage from './ComparisonImages/noImage.png';
import Star from './ComparisonImages/starImg.png';
import Half from './ComparisonImages/halfStar.png';

const RelatedItem = (props) => {
  var productData,
      price,
      originalPrice,
      image,
      ratings,
      redStyle;
  var [show, setShow] = useState(false);

  if (!props.image) {
    image = NoImage;
  } else {
    image = props.image;
  }
  for (var product of props.relatedData) {
    if (product.id === props.productId) {
      productData = product;
    }
  }
  if (productData.salePrice) {
    price = '$' + productData.salePrice;
    originalPrice = '$' + productData.originalPrice;
    redStyle = {color: 'red'};
  } else {
    price = '$' + productData.originalPrice;
  }

  console.log('this is the ratings: ', props.ratings);

  return (
    <div className='listItem'>
      <div className='relatedImgBox' >
        <img className='starImg' src={Star} onClick={() => setShow(true)}></img>
        <img className='relatedImg' src={image}></img>
      </div>
      <div className='relatedDetails'>
        <div className='category'>{props.category}</div>
        <div className='productName'>{props.name}</div>
        <div className='price'>
          <div className='salePrice' style={redStyle}>{price}</div>
          <div className='originalPrice'> {originalPrice}</div>
        </div>
        <div className='rating'>
            <img className='ratingStar' src={Half}></img>
            <img className='ratingStar' src={Half}></img>
            <img className='ratingStar' src={Half}></img>
            <img className='ratingStar' src={Half}></img>
            <img className='ratingStar' src={Half}></img>
        </div>
     </div>
      <ComparisonModal  currProductData={props.currProductData}
                        relatedData={productData} show={show}
                        onClose={() => setShow(false)} show={show}/>
    </div>
  );
}

const Related = (props) => {
  console.log('Related Props: ', props);
  var relatedItems = (props.relatedData).map((item) =>
    <RelatedItem  key={item.id} productId={item.id} relatedData={props.relatedData}
                  displayModal={props.displayModal} category={item.category} name={item.name}
                  price={item.default_price} image={item.productImg} ratings={item.ratings}
                  currProductData={props.currProductData} />
  );
  return(
      <div className='scrollWrapper'>
        <div id='relatedCarousel'>
          {relatedItems}
        </div>
      </div>
    )
}


export default Related;