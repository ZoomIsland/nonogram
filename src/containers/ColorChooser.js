import React, { Component } from 'react';
import { ChromePicker } from 'react-color';

import './ColorChooser.css';

import GridColor from '../components/GridColor/GridColor'

class ColorChooser extends Component {
  state = {
    editingColor: false
  }

  colorEditorToggle = (index) => {
    if (this.state.editingColor) {
      this.props.onColorEditorClose();
    } else {
      this.props.onColorClick(index);
    }
    this.setState({editingColor: !this.state.editingColor})
  }

  render() {
    return (
      <div className="creatorColorContainer">
        <GridColor 
                color={this.props.color}
                colorIndex={this.props.colorIndex}
                // selected={this.props.selected} 
                selectedColorIndex={this.props.selectedColorIndex}
                // onColorClick={this.props.onColorClick}
                onColorClick={this.colorEditorToggle}
                // hover={this.state.hover}
              />
        { this.state.editingColor ? <div className="popover"> 
            <div className="cover" 
                //  onClick={this.props.onColorEditorClose}
                onClick={this.colorEditorToggle} /> 
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