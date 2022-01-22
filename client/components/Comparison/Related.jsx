import React, {useState} from 'react';
import ComparisonModal from './ComparisonModal.jsx';
import Star from './ComparisonImages/starImg.png';
import NoImage from './ComparisonImages/noImage.png';
import Ratings from './Ratings.jsx';
import Price from './Price.jsx';


const RelatedItem = (props) => {
  console.log('Related Items props: ', props);
  var [show, setShow] = useState(false);
  var image = props.image ? props.image : NoImage;
  var currProductData,
      relatedProduct,
      ratings;

  for (var product of props.relatedProducts) {
    if (product.id === props.productId) {
      relatedProduct = product;
    }
  }

  return (
    <div className='listItem'>
    <div className='relatedImgBox' >
      <img className='starImg' src={Star} onClick={() => setShow(true)}></img>
      <img className='relatedImg' value={props.productId} src={image} onClick={() => {props.changeId(props.productId)}} ></img>
    </div>
      <div className='relatedDetails'>
        <div className='category'>{props.category}</div>
        <div className='productName'>{props.name}</div>
        <Price salePrice={props.salePrice} originalPrice={props.originalPrice} />
        <Ratings ratings={props.ratings} />
     </div>
      <ComparisonModal  currProductData={props.currProductData}
                        features={props.features}
                        relatedProduct={relatedProduct}
                        show={show}
                        onClose={() => setShow(false)} show={show}
      />
    </div>
  );
}

const Related = (props) => {
  console.log('Related Props: ', props);
  var relatedItems = (props.relatedProducts).map((product) =>
    <RelatedItem  key = {product.id}
                  productId = {product.id}
                  relatedProducts = {props.relatedProducts}
                  category = {product.category}
                  name = {product.name}
                  salePrice = {product.salePrice}
                  originalPrice = {product.originalPrice}
                  image = {product.imageUrl}
                  ratings = {product.ratings}
                  currProductData = {props.currProductData}
                  changeId = {props.changeId}
                  features = {product.features}
    />
  );
  return(
      <div id='related' className='scrollWrapper'>
        <div id='relatedCarousel'>
          {relatedItems}
        </div>
      </div>
    )
}


export default Related;