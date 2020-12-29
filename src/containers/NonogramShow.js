import React, { Component } from 'react';
import axios from 'axios';

import SolverGrid from '../components/Grids/SolverGrid';

class NonogramShow extends Component {
  state = {
    nonogramData: {},
    colors: [],
    selectedColorIndex: 0,
    currentAttempt: [],
    startDraw: ""
  }

  componentDidMount = () => {
    // this works for "random" or ":id"
    axios.get(`http://localhost:3001/nonogram/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({nonogramData: response.data});
        this.setState({colors: response.data.colorArray})
        // create currentAttempt based on data...
        let currentAttempt = [];
        for (let i = 0; i < response.data.height; i++) {
          let currentRow = [];
          for (let j = 0; j < response.data.width; j++) {
            currentRow.push("X");
          }
          currentAttempt.push(currentRow);
        }
        this.setState({currentAttempt});
      })
      .catch((err) => {
        console.log(err)
      })
  }

  onColorClick = (index) => {
    if (index !== this.state.selectedColorIndex) {
      this.setState({selectedColorIndex: index})
    }
  }

  // targets attempt instead of solution
  parsePositionAndSetState = (positionStr) => {
    const midpoint = positionStr.indexOf("c");
    const row = parseInt(positionStr.substring(1, midpoint));
    const column = parseInt(positionStr.substring(midpoint + 1, positionStr.length));

    const updatedAnswer = [...this.state.currentAttempt];
    updatedAnswer[row][column] = this.state.selectedColorIndex;
    this.setState({currentAttempt: updatedAnswer})
  }

  // copy/pasted from GridCreatorContainer
  // which likely means this should go on Grid.
  onMouseDownOnBox = (e) => {
    this.setState({startDraw: e.target.id})
    this.parsePositionAndSetState(e.target.id);
    // console.log(e.target.id);
  }

  onMouseEnterBox = (e) => {
    if (this.state.startDraw.length) {
      // console.log(e.target.id);
      this.parsePositionAndSetState(e.target.id)
    }    
  }

  onMouseUpOnBox = () => {
    this.setState({startDraw: ""})
  }


  // Do I want to use this for the solver?
  // Draws in a straight line only
  
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
      // solved v unsolved switch?
      // One has solver, other has solution?
      // uncertain where "Solved" would live in the model
      <div className="showContainer">
        <SolverGrid 
          data={this.state.nonogramData}
          colors={this.state.colors}
          selectedColorIndex={this.state.selectedColorIndex}
          onColorClick={this.onColorClick}
          onMouseDownOnBox={this.onMouseDownOnBox}
          onMouseEnterBox={this.onMouseEnterBox}
          onMouseUpOnBox={this.onMouseUpOnBox}
          currentAttempt={this.state.currentAttempt}
        />
      </div>
    )
  }
}

export default NonogramShow;