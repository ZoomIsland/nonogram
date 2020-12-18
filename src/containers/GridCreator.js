import React, { Component } from 'react';

import Grid from '../components/Grid/Grid'

class GridCreator extends Component {
  state = {
    gridHeight: 15,
    gridWidth: 15,
    gridColors: ['white','black', 'red', 'yellow','green'],
    gridAnswer: [],
    selectedColorIndex: 0,
    startDraw: ""
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

  onColorChange = (color) => {
    console.log(color.hex);
    let colorArray = [...this.state.gridColors];
    colorArray[this.state.selectedColorIndex] = color.hex;
    this.setState({gridColors: colorArray});
  }

  parsePositionAndSetState = (positionStr) => {
    // const positionObj = {}
    const midpoint = positionStr.indexOf("c");
    const row = parseInt(positionStr.substring(1, midpoint));
    const column = parseInt(positionStr.substring(midpoint + 1, positionStr.length));

    // positionObj.row = row;
    // positionObj.column = column;
    // return positionObj;

    const updatedAnswer = [...this.state.gridAnswer];
    updatedAnswer[row][column] = this.state.selectedColorIndex;
    this.setState({gridAnswer: updatedAnswer})
  }

  onMouseDownOnBox = (e) => {
    // this should setState on startDraw
    this.setState({startDraw: e.target.id})
    this.parsePositionAndSetState(e.target.id);
    console.log(e.target.id);
  }

  onMouseEnterBox = (e) => {
    if (this.state.startDraw.length) {
      console.log(e.target.id);
      this.parsePositionAndSetState(e.target.id)
    }    
  }

  onMouseUpOnBox = () => {
    this.setState({startDraw: ""})
  }

  //this is probably a great tool for the player
  // for the Creator, it should probably just be the mouseenter changing things.
  // onMouseUpOnBox = (e) => {
  //   // this should finalize endDraw;
  //   const endDraw = e.target.id;
  //   // it will setState of gridAnswer;
  //   if (this.state.startDraw === endDraw) {
  //     const position = this.parsePosition(this.state.startDraw);

  //     const updatedAnswer = [...this.state.gridAnswer];
  //     updatedAnswer[position.row][position.column] = this.state.selectedColorIndex;
  //     this.setState({gridAnswer: updatedAnswer})
  //   } else {
  //     const startObj = this.parsePosition(this.state.startDraw);
  //     const endObj = this.parsePosition(endDraw);
  //     const updatedAnswer = [...this.state.gridAnswer];

  //     // rows match, so the row can be updated
  //     console.log ("rows match");
  //     if (startObj.row === endObj.row) {
  //       // for loop, start is startObj.column, end is endObj.column;
  //       if (startObj.column > endObj.column) {
  //         for (let i = endObj.column; i <= startObj.column; i++) {
  //           updatedAnswer[startObj.row][i] = this.state.selectedColorIndex;
  //         }
  //       } else {
  //         for (let i = startObj.column; i <= endObj.column; i++) {
  //           updatedAnswer[startObj.row][i] = this.state.selectedColorIndex;
  //         }
  //       }
        

  //     // columns match, so the column can be updated
  //     } else if (startObj.column === endObj.column) {
  //       console.log("columns match");
  //       // for loop, start is startObj.row, end is endObj.row;
  //       if (startObj.row > endObj.row) {
  //         for (let i = endObj.row; i <= startObj.row; i++) {
  //           updatedAnswer[i][startObj.column] = this.state.selectedColorIndex;
  //         }
  //       } else {
  //         for (let i = startObj.row; i <= endObj.row; i++) {
  //           updatedAnswer[i][startObj.column] = this.state.selectedColorIndex;
  //         }
  //       }
  //     }
  //   }

  //   // it will clear startDraw and endDraw;
  //   this.setState({startDraw: ""})
  //   console.log(e.target.id);
  // }

  

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
          onColorChange={this.onColorChange}
          onMouseDownOnBox={this.onMouseDownOnBox}
          onMouseEnterBox={this.onMouseEnterBox}
          onMouseUpOnBox={this.onMouseUpOnBox} />
      </div>
    )
  }
}

export default GridCreator;