import React, { Component } from 'react';
import axios from 'axios';

import SolverGrid from '../components/Grids/SolverGrid';

class NonogramShow extends Component {
  state = {
    nonogramData: {},
    rowClues: [],
    columnClues: [],
    colors: [],
    selectedColorIndex: 0,
    currentAttempt: [],
    fillType: "",
    startDraw: ""
  }

  componentDidMount = () => {
    // this works for "random" or ":id"
    axios.get(`http://localhost:3001/nonogram/${this.props.match.params.id}`)
      .then((response) => {
        // set nonogram Data
        this.setState({nonogramData: response.data});
        this.setState({colors: response.data.colorArray});

        //get and set clue row data
        let rowClues = [];
        for (let i = 0; i < response.data.height; i++) {
          let tupleRows = this.getTupleArray(response.data.nonogramArray[i]);
          rowClues.push(tupleRows);
        }
        this.setState({rowClues: rowClues});

        //get and set clue column data
        let columnClues = [];
        for (let i = 0; i < response.data.width; i++) {
          let column = [];
          for (let j = 0; j < response.data.height; j++) {
            column.push(response.data.nonogramArray[j][i]);
          }
          let tupleColumns = this.getTupleArray(column);
          columnClues.push(tupleColumns);
        }
        this.setState({columnClues: columnClues});


        // create currentAttempt based on data...
        let currentAttempt = [];
        for (let i = 0; i < response.data.height; i++) {
          let currentRow = [];
          for (let j = 0; j < response.data.width; j++) {
            currentRow.push("");
          }
          currentAttempt.push(currentRow);
        }
        this.setState({currentAttempt});
        setTimeout(()=>this.testSolution(), 250);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getTupleArray = (array)  => {
    let tupleArray = [];
    let count = 0;
    let prevColorIndex = array[0];
    let colorIndex, nextColorIndex;
    let index = 0;
    while (index < array.length) {
      colorIndex = array[index];

      //current is X, previous is NOT.
      if (colorIndex === "X" && count > 0) {
        tupleArray.push([prevColorIndex, count])
        count = 0;
      // current is X, previous WAS.
      } else if (colorIndex === "X") {
        count = 0;
      } else { // current is a digit
        count++;
        if (array[index + 1] !== -1) { // if there's a next digit to test
          nextColorIndex = array[index + 1];
          if (colorIndex !== nextColorIndex) {
            tupleArray.push([colorIndex, count])
            count = 0;
          }
        } else { // if it's the last one
          tupleArray.push([colorIndex, count])
        }
      }
      prevColorIndex = colorIndex;
      index++;
    }
    return tupleArray;
  }

  onColorClick = (index) => {
    if (index !== this.state.selectedColorIndex) {
      this.setState({selectedColorIndex: index})
    }
  }

  parsePositionAndSetFill = (positionStr, type) => {
    const midpoint = positionStr.indexOf("c");
    const row = parseInt(positionStr.substring(1, midpoint));
    const column = parseInt(positionStr.substring(midpoint + 1, positionStr.length));

    const updatedAnswer = [...this.state.currentAttempt];
    if (type === 1 && this.state.selectedColorIndex === updatedAnswer[row][column]) {
      this.setState({fillType: "empty"});
      return "empty";
    } else if (type === 1) {
      this.setState({fillType: "index"});
      return "index";
    } else if (type === 3 && updatedAnswer[row][column] === "X") {
      this.setState({fillType: "empty"});
      return "empty";
    } else if (type === 3) {
      this.setState({fillType: "X"});
      return "X";
    }
  }

  // targets attempt instead of solution
  parsePositionAndSetState = (positionStr, fillType = "") => {
    const midpoint = positionStr.indexOf("c");
    const row = parseInt(positionStr.substring(1, midpoint));
    const column = parseInt(positionStr.substring(midpoint + 1, positionStr.length));

    const updatedAnswer = [...this.state.currentAttempt];
    if (this.state.fillType === "empty" || fillType === "empty") {
      updatedAnswer[row][column] = "";
    } else if (this.state.fillType === "index" || fillType === "index") {
      updatedAnswer[row][column] = this.state.selectedColorIndex;
    } else if (this.state.fillType === "X" || fillType === "X") {
      updatedAnswer[row][column] = "X";
    }

    this.setState({currentAttempt: updatedAnswer})
  }

  // copy/pasted from GridCreatorContainer
  // which likely means this should go on Grid.
  onMouseDownOnBox = (e) => {
    const clickType = e.nativeEvent.which;
    this.setState({startDraw: e.target.id})
    // console.log(e.target.id);
    const fillType = this.parsePositionAndSetFill(e.target.id, clickType);
    this.parsePositionAndSetState(e.target.id, fillType);
  }

  onMouseEnterBox = (e) => {
    if (this.state.startDraw.length) {
      // console.log(e.target.id);
      this.parsePositionAndSetState(e.target.id);
    }    
  }

  onMouseUpOnBox = () => {
    if (this.state.startDraw.length) {
      this.setState({fillType: ""});
      this.setState({startDraw: ""});
  
      // call the testSolution function with slight delay?
      setTimeout(()=>this.testSolution(), 250)
    }
  }

  testSolution = () => {
    const answer = [...this.state.nonogramData.nonogramArray];
    const attempt = [...this.state.currentAttempt];
    const width = this.state.nonogramData.width;
    const height = this.state.nonogramData.height;

    let allEqual = true;

    // testing Rows for now because it's easier
    for (let i = 0; i < height; i++) {
      let rowsEqual = true;
      for (let j = 0; j < width; j++) {

        // if answer is X
        if (answer[i][j] === "X") {
          if (attempt[i][j] !== "" && attempt[i][j] !== "X") {
            rowsEqual = false;
            allEqual = false;
          }

        // else answer is a number
        } else {
          if (attempt[i][j] !== answer[i][j]) {
            rowsEqual = false;
            allEqual = false;
          }
        }
      }
      if (rowsEqual) {
        attempt[i] = [...answer[i]];
      }
    }
    this.setState({currentAttempt: attempt})

    // testing Columns TK
    for (let i = 0; i < width; i++) {
      let columnsEqual = true;
      for (let j = 0; j < height; j++) {

        // if answer is X
        if (answer[j][i] === "X") {
          if (attempt[j][i] !== "" && attempt[j][i] !== "X") {
            columnsEqual = false;
            allEqual = false;
          }

        // else answer is a number
        } else {
          if (attempt[j][i] !== answer[j][i]) {
            columnsEqual = false;
            allEqual = false;
          }
        }
      }
      if (columnsEqual) {
        for (let j = 0; j < height; j++) {
          attempt[j][i] = answer[j][i];
        }
      }
      
      this.setState({currentAttempt: attempt})
    }
    if (allEqual) {
      console.log("You did it!")
      // likely I'll want to change make this into a modal
      // and change what displays
      // maybe make a call to the API to change this to "solved"
      // which likely means an intermediary Model between user and puzzle
    }
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
          rowClues={this.state.rowClues}
          columnClues={this.state.columnClues}
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