import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './components/Overview.jsx';
import Comparison from './components/Comparison.jsx';
import Reviews from './components/Reviews.jsx';
import './styles.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 59556,
      shouldAddToCarousel: {},
      outfitCarousel: []

    }
    this.changeId = this.changeId.bind(this);
    this.appAddToCarousel = this.appAddToCarousel.bind(this);
    // this.starClickHandler = this.startClickHandler.bind(this);

  }

  // starClickHandler() {
  //   //if star is clicked
  //   //update outfitCarousel by adding the current productId
  // }

  removeFromCarousel(){
    this.setState({
      addToCarousel: false
    })
  }

  appAddToCarousel(thingToBeAdded) {
    console.log("Inside appAddToCarousel ", thingToBeAdded);
    this.setState({
      shouldAddToCarousel: thingToBeAdded
    });
  }

  changeId(event) {
    console.log("Inside changeId of app",event);
    this.setState({
      id: event,
    }, () => {
      console.log("Successfully changed state of App to ", this.state.id);
    });
  }

  render() {
    return (
      <div>
        <Overview productId={this.state.id} appAddToCarousel={this.appAddToCarousel} />
        <Comparison productId={this.state.id} changeId={this.changeId} addToCarousel={this.appAddToCarousel}/>
        <Reviews productId={this.state.id}/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));