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
      addToCarousel: false,
      outfitCarousel: []

    }
    this.changeId = this.changeId.bind(this);
    this.addToCarousel = this.addToCarousel.bind(this);
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

  addToCarousel() {
    this.setState({
      addToCarousel: !this.state.addToCarousel
    });
  }

  changeId(event) {
    this.setState({
      id: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <Overview productId={this.state.id} addToCarousel={this.addToCarousel} />
        <Comparison productId={this.state.id} changeId={this.changeId} addToCarousel={this.addToCarousel}/>
        <Reviews productId={this.state.id}/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));