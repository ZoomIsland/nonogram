import React, { Component } from 'react';
import { ChromePicker } from 'react-color';

import './ColorChooser.css';

import GridColor from '../components/GridColor/GridColor'

class ColorChooser extends Component {
  state={
    hover: false
  }

  onMouseEnter = () => {
    this.setState({hover: true});
  }

  onMouseLeave = () => {
    this.setState({hover: false});
  }

  render() {
    return (
      <div className="creatorColorContainer">
        <GridColor 
                color={this.props.color}
                colorIndex={this.props.colorIndex}
                selected={this.props.selected} 
                onColorClick={this.props.onColorClick}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                hover={this.state.hover}
              />
        { this.props.editingColor ? <div className="popover"> 
            <div className="cover" 
                 onClick={this.props.onColorEditorClose} /> 
            <ChromePicker 
              disableAlpha={true}
              color={this.props.color}
              onChange={this.props.onColorChange} /> 
        </div> : null }
      </div>
    )
  }
}

export default ColorChooser;