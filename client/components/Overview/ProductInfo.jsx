import React from 'react';
import StarRating from './StarRating.jsx';
import StyleInfo from './StyleInfo.jsx';

//Eventually, ProductInfo only needs the styleID passed down as it can make calls to the API to find everything passed down in static version

class ProductInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productID: props.results.product_id,
            ratings: this.overallRating(props.ratings.ratings)
        };
    }

    overallRating(obj) {
        var rating = 0;
        var numReviews = 0;
        var starArr = [];
        var closest = 2;
        var closestQuarter = 2;
        var firstUnfilledIndex = 0;
        for (var i in obj) {
            rating += (parseInt(i) * parseInt(obj[i]));
            numReviews += parseInt(obj[i]);
        }
        var average = rating/numReviews;
        for(var i = 0; i < 5; i++) {
            if (average > 1) {
                starArr.push({'value': 1, 'index': i});
                average--;
                firstUnfilledIndex++;
            } else {
                starArr.push({'value': 0, 'index': i});
            }
        }
        for(var i = 0; i <= 1; i += 0.25) {
            if (Math.abs(average - i) < closest) {
                closest = average - i;
                closestQuarter = i;
            }
        }
        starArr[firstUnfilledIndex] = {'value': closestQuarter, 'index' : firstUnfilledIndex};
        return starArr;
    }

    render() {
        return(
            <div >
                <StarRating rating={this.state.ratings} />
                <StyleInfo productOverview={this.props.productOverview} 
                    style={this.props.results[this.props.currStyle]} 
                    styles={this.props.results} 
                    currStyle={this.props.currStyle} 
                    updateStyle={this.props.updateStyle}
                    addToCarousel={this.props.addToCarousel}
                    productId={this.props.productId}
                />
            </div>)
    }
}

export default ProductInfo;