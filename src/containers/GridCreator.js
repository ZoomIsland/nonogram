import React, { Component } from 'react';

import Grid from '../components/Grid/Grid'

class GridCreator extends Component {
  state = {
    gridHeight: 15,
    gridWidth: 15,
    gridColors: ['black', 'red', 'yellow'],
    gridAnswer: [],
    selectedColorIndex: 0
  }
  render() {
    return (
      <div>
        This is the creator...
        And it holds...
        <Grid
          gridHeight={this.state.gridHeight}
          gridWidth={this.state.gridWidth}
          gridColors={this.state.gridColors}
          gridAnswer={this.state.gridAnswer} />
      </div>
    )
  }
}

export default GridCreator;