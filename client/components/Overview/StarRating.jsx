import React from 'react';

var StarRating = (props) => {
    return(
        <div id="starRating">
            {props.rating.map(starNumber => {
                var filledStar = starNumber.value === 0 ? <img key={starNumber.index} src={'./img/emptyStar.png'} className="weirdStar" alt="star"></img> : ''
                filledStar = starNumber.value === 0.25 ? <img key={starNumber.index} src={'./img/quarterStar.png'} className="indStar" alt="star"></img> : filledStar;
                filledStar = starNumber.value === 0.5 ? <img key={starNumber.index} src={'./img/halfStar.png'} className="indStar" alt="star"></img> : filledStar;
                filledStar = starNumber.value === 0.75 ? <img key={starNumber.index} src={'./img/threeQuarterStar.png'} className="indStar" alt="star"></img> : filledStar;
                filledStar = starNumber.value === 1 ? <img key={starNumber.index} alt="work harder bro" src={'./img/filledStar.png'} className="indStar" alt="star"></img> : filledStar;
                return filledStar;
            })}
            <a href="#reviews">Read all reviews</a>
            
        </div>)
}

export default StarRating;