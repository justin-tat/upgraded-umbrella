import React from 'react';
import DefaultView from './Overview/DefaultView.jsx'

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'normal',
      view: 'default' 
    };
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseEnter(event) {
    this.setState({
      status: 'hovered'
    })
  }

  onMouseLeave(event) {
    this.setState({
      status: 'normal'
    });
  }

  

  render() {
    return(
      <div className={this.state.status}>
        <h2 onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>Overview Modal</h2>
        {this.state.view === 'default' 
          ? <DefaultView />
          : <ExpandedView />}
      </div>
    )
  }
}

export default Overview;