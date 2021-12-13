import React from 'react';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'normal'
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
      </div>
    )
  }
}

export default Overview;