import React, { Component } from 'react';
import { ChromePicker } from 'react-color';

import './ColorChooser.css';

import GridColor from '../components/GridColor/GridColor'

class ColorChooser extends Component {
  state={
    hover: false,
    editingColor: false
  }

  onMouseEnter = () => {
    this.setState({hover: true});
  }

  onMouseLeave = () => {
    this.setState({hover: false});
  }

  onEditClick = () => {
    console.log("clicked edit");
    this.setState({editingColor: true});
  }

  handlePickerClose = () => {
    this.setState({editingColor: false});
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
                onEditClick={this.onEditClick}
                hover={this.state.hover}
              />
        { this.state.editingColor ? <div className="popover"> 
            <div className="cover" 
                 onClick={this.handlePickerClose} /> 
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