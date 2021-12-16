import React from 'react';
import exampleData from '../../exampleData/OverviewData.js';
import ThumbnailList from './ThumbnailList.jsx';
import ProductInfo from './ProductInfo.jsx';

class DefaultView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            styles: exampleData.styles,
            currStyle: 0,
            currIndex: 0,
            variations: exampleData.styles.results[0].photos,
            reviewMetadata: exampleData.reviewMetadata
        };
    }



    render() {
        return(
        <div id="defaultView">
            <img id="mainImage" src={this.state.variations[this.state.currIndex].url} ></img>
            <ThumbnailList photos={this.state.variations}/>
            <ProductInfo styles={this.state.styles} ratings={this.state.reviewMetadata}/>
        </div>);

    }
}

export default DefaultView;