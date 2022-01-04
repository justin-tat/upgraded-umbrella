import React, { Component, createRef } from 'react'


class Zoom extends Component {
  constructor (props) {
    super(props)

    this.state = {
      zoom: false,
      mouseX: null,
      mouseY: null,
      newHeight: 0,
      newWidth: 0
    }

    const {
      img,
      transitionTime,
    } = props

    this.innerDivStyle = {
      height: `100%`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'auto 100%',
      transition: `transform ${transitionTime}s ease-out`,
      backgroundImage: `url('${img}')`,
    }

    this.imageRef = createRef();

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseMovement = this.handleMouseMovement.bind(this);
  }

  componentDidMount() {
    this.isLandscape();
  }

  handleMouseOver () {
    this.setState({
      zoom: true,
    })
  }

  handleMouseOut () {
    this.setState({
      zoom: false,
    })
  }

  isLandscape() {
      var imgAspectRatio = this.props.dimensions.width / this.props.dimensions.height;
      var windowAspectRatio = 1120 / 640;
      //When width should be set to 100%
      if (imgAspectRatio > windowAspectRatio) {
          var newHeight = 1120 / imgAspectRatio;
          this.outerDivStyle = {
              width: "1120px",
              height: `${newHeight}px`
          }
          this.setState({
            newWidth: 1120,
            newHeight: newHeight
          });
      //When height should be set to 100%
      } else {
          var newWidth = 640 * imgAspectRatio;
          this.outerDivStyle = {
              width: `${newWidth}px`,
              height: "640px"
          }
          this.setState({
            newWidth: newWidth,
            newHeight: 640 
          });
      }
  }

  handleMouseMovement (e) {
    var leftOffset = this.imageRef.current.getBoundingClientRect().left;
    var topOffset = this.imageRef.current.getBoundingClientRect().top;
    const x = ((e.pageX - leftOffset) / parseInt(this.state.newWidth)) * 100;
    const y = ((e.pageY - topOffset) / parseInt(this.state.newHeight)) * 100;


    this.setState({
      mouseX: x,
      mouseY: y,
    })
  }

  render () {
    const {
      mouseX,
      mouseY,
      zoom,
    } = this.state;

    const {
      zoomScale,
    } = this.props;

    const transform = {
      transformOrigin: `${mouseX}% ${mouseY}%`,
    };

    return (
      <div
        style={this.outerDivStyle}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        onMouseMove={this.handleMouseMovement}
        ref={this.imageRef}
        onClick={this.props.zoom}
        id="zoomedInImage"
      >
        <div
          style={{
            ...transform,
            ...this.innerDivStyle,
            transform: zoom ? `scale(${zoomScale})` : 'scale(1.0)',
          }}

        />
      </div>
    )
  }
}

export default Zoom