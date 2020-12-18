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

  componentDidMount = () => {
    // if utilizing for editing,
    // adjust below to an if statement (if new or api call is empty...)
    let gridArray = [];
    for (let i = 0; i < this.state.gridHeight; i++) {
      let rowArray = [];
      for (let j = 0; j < this.state.gridWidth; j++) {
        rowArray.push(["X"]);
      }
      gridArray.push(rowArray)
    }
    console.log(gridArray)
    this.setState({gridAnswer: gridArray});
  }

  onColorClick = (index) => {
    this.setState({selectedColorIndex: index})
  }

  onBoxClick = (e) => {
    console.log(e.target.id)
    const position = e.target.id;
    const midpoint = position.indexOf("c");
    const row = parseInt(position.substring(1, midpoint));
    const column = parseInt(position.substring(midpoint + 1, position.length));
    console.log([row, column]);

    const updatedAnswer = [...this.state.gridAnswer];
    updatedAnswer[row][column] = this.state.selectedColorIndex;

    this.setState({gridAnswer: updatedAnswer})


    // should do two things:
    //update the gridAnswer with the selectedColorIndex at the appropriate position
    //update the box itself with the appropriate color
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
          selectedColorIndex={this.state.selectedColorIndex}
          gridAnswer={this.state.gridAnswer}
          onColorClick={this.onColorClick}
          onBoxClick={this.onBoxClick} />
      </div>
    )
  }
}

export default GridCreator;