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
                gridType={this.props.gridType} 
                color={this.props.color}
                colorIndex={this.props.colorIndex}
                selectedColorIndex={this.props.selectedColorIndex}
                onColorClick={this.colorEditorToggle}
              />
        { this.state.editingColor ? <div className="popover"> 
            <div className="cover"
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