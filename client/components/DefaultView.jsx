import React from 'react';
import exampleData from '../exampleData/OverviewData.js';

class DefaultView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            styles: exampleData.styles.results,
            currStyle: 0,
            currIndex: 1
        };
    }



    render() {
        return(
        <div id="defaultView">
            <img id="mainImage" src={this.state.styles[this.state.currStyle].photos[this.state.currIndex].url} ></img>
            
        </div>);

    }
}

export default DefaultView;