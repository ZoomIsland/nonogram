import { render } from '@testing-library/react'
import React, { Component } from 'react';

import GridColor from '../components/GridColor/GridColor'

class ColorChooser extends Component {
  state={
    hover: false,
  }

  onMouseEnter = () => {
    this.setState({hover: true})
  }

  onMouseLeave = () => {
    this.setState({hover: false})
  }

  onEditClick = () => {
    console.log("clicked edit")
  }

  render() {
    return (
      <GridColor 
              background={this.props.background}
              colorIndex={this.props.colorIndex}
              selected={this.props.selected} 
              onColorClick={this.props.onColorClick}
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
              onEditClick={this.onEditClick}
              hover={this.state.hover}
            />
    )
  }
}

export default ColorChooser;