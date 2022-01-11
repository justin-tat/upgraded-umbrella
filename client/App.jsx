import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './components/Overview.jsx'
import Comparison from './components/Comparison.jsx'
import Reviews from './components/Reviews.jsx'
import "./styles.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 59553
    }
  }

  render() {
    return (
      <div>
        <h1>Team Parasol's App</h1>
        <Overview productId={this.state.id}/>
        <Comparison productId={this.state.id}/>
        <Reviews productId={this.state.id}/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));