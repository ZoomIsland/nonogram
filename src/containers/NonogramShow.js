import React, { Component } from 'react';

import getClueObjects from '../util/getClueObjects';

import SolverGrid from '../components/Grids/SolverGrid';
import NonogramModel from '../models/nonograms';

class NonogramShow extends Component {
  state = {
    nonogramData: {},
    rowClues: [],
    columnClues: [],
    colors: [],
    selectedColorIndex: 0,
    currentAttempt: [],
    testedAttempt: [],
    fillType: "",
    startDraw: ""
  }

  componentDidMount = () => {
    // this works for "random" or ":id"
    NonogramModel.getSingleNonogram(this.props.match.params.id)
      .then((response) => {
        // set nonogram Data
        this.setState({nonogramData: response.data});
        this.setState({colors: response.data.colorArray});

        //get and set clue row data
        let rowClues = [];
        for (let i = 0; i < response.data.height; i++) {
          let tupleRows = getClueObjects(response.data.nonogramArray[i]);
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
          let tupleColumns = getClueObjects(column);
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

  parsePosition = (positionStr) => {
    const midpoint = positionStr.indexOf("c");
    const row = parseInt(positionStr.substring(1, midpoint));
    const column = parseInt(positionStr.substring(midpoint + 1, positionStr.length));
    return {
      row: row,
      column: column,
    }
  }

  getFillType = (positionStr, type) => {
    let position = this.parsePosition(positionStr);

    const updatedAnswer = [...this.state.currentAttempt];
    if (type === 1 && this.state.selectedColorIndex === updatedAnswer[position.row][position.column]) {
      this.setState({fillType: "empty"});
      return "empty";
    } else if (type === 1) {
      this.setState({fillType: "index"});
      return "index";
    } else if (type === 2 && updatedAnswer[position.row][position.column] === "X") {
      this.setState({fillType: "empty"});
      return "empty";
    } else if (type === 2) {
      this.setState({fillType: "X"});
      return "X";
    } else {
      return ""
    }
  }

  // targets attempt instead of solution
  parsePositionAndSetState = (positionStr, fillType = "") => {
    let position = this.parsePosition(positionStr);

    const updatedAnswer = [...this.state.currentAttempt];
    if (fillType === "empty") {
      updatedAnswer[position.row][position.column] = "";
    } else if (fillType === "index") {
      updatedAnswer[position.row][position.column] = this.state.selectedColorIndex;
    } else if (fillType === "X") {
      updatedAnswer[position.row][position.column] = "X";
    }

    this.setState({currentAttempt: updatedAnswer})
  }

  onMouseDownOnBox = (e) => {
    const clickType = e.buttons;
    const positionStr = e.target.id;

    this.setState({startDraw: e.target.id});

    const fillType = this.getFillType(positionStr, clickType);
    this.parsePositionAndSetState(positionStr, fillType);
  }

  onMouseEnterBox = (e) => {
    const positionStr = e.target.id;
      this.parsePositionAndSetState(positionStr, this.state.fillType);
  }

  onMouseUpOnBox = () => {
    if (this.state.startDraw.length) {
      this.setState({fillType: ""});
      this.setState({startDraw: ""});

      console.log("run the tests!")
      let attemptToTest = [...this.state.currentAttempt];
      this.setState({testedAttempt: attemptToTest});
      this.testSolution(attemptToTest);
      this.testClues(attemptToTest); 
    }
  }

  testClues = (attempt) => {
    let nothingChanged = true;
    // TEST ROWS FIRST:
    // make copy of rowClues
    let rowCluesCopy = [...this.state.rowClues];
    // for every row in Attempt
    for (let i = 0; i < attempt.length; i++) {
      //run that row through getClueObjects
      let attemptRowObjects = getClueObjects(attempt[i]);
      //test each object in resulting array
      for (let j = 0; j < attemptRowObjects.length; j++) {
        // grab endIndex of object
        let currentObj = attemptRowObjects[j];
        let attemptEndIndex = currentObj.endIndex;
        // run findIndex on rowClues[i] for endIndex: endIndex
        let foundClueIndex = rowCluesCopy[i].findIndex(obj => obj.endIndex === attemptEndIndex);
        if (foundClueIndex >= 0) {
          // if found, test all keys (except solved)
          let foundClue = rowCluesCopy[i][foundClueIndex];
          if (currentObj.count === foundClue.count && currentObj.colorIndex === foundClue.colorIndex) {
            // if all key/value pairs match, change solved (on rowClues copy) to true
            foundClue.solved = true;
            nothingChanged = false;
          }
        }
      }
    }
    if (!nothingChanged) {
      // update rowClues in state
      this.setState({rowClues:rowCluesCopy});
    }


    // NOW TEST COLUMNS:
    nothingChanged = true;
    // make copy of columnClues
    let columnCluesCopy = [...this.state.columnClues];
    // adjust attempt to be column-based...
    let attemptInColumns = [];
    for (let i = 0; i < this.state.nonogramData.width; i++) {
      let column = [];
      for (let j = 0; j < this.state.nonogramData.height; j++) {
        column.push(attempt[j][i]);
      }
      let columnObjects = getClueObjects(column);
      attemptInColumns.push(columnObjects);
    }

    // now iterate across attempt like you did rows...
    for (let k = 0; k < attemptInColumns.length; k++) {
      for (let l = 0; l < attemptInColumns[k].length; l++) {
        // grab endIndex of object
        let currentObj = attemptInColumns[k][l];
        let attemptEndIndex = currentObj.endIndex;
        // run findIndex on columnClues[k] for endIndex: endIndex
        let foundClueIndex = columnCluesCopy[k].findIndex(obj => obj.endIndex === attemptEndIndex);
        if (foundClueIndex >= 0) {
          // if found, test all keys (except solved)
          let foundClue = columnCluesCopy[k][foundClueIndex];
          if (currentObj.count === foundClue.count && currentObj.colorIndex === foundClue.colorIndex) {
            // if all key/value pairs match, change solved (on rowClues copy) to true
            foundClue.solved = true;
            nothingChanged = false;
          }
        }
      }
    }
    if (!nothingChanged) {
      // update columnClues in state
      this.setState({columnClues:columnCluesCopy});
    }
  }

  testSolution = (attempt) => {
    console.log(attempt)
    console.log("starting testSolution")
    const answer = [...this.state.nonogramData.nonogramArray];
    console.log(answer)
    const width = this.state.nonogramData.width;
    const height = this.state.nonogramData.height;
    console.log(`Width: ${width} & ${height}`)

    let allEqual = true;

    // testing Rows
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
        attempt[i] = answer[i];
      }
    }

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
      
      this.setState({testedAttempt: attempt});
      this.setState({currentAttempt: attempt});
    }
    if (allEqual) {
      console.log("You did it!")
      // likely I'll want to change make this into a modal
      // and change what displays
      // maybe make a call to the API to change this to "solved"
      // which likely means an intermediary Model between user and puzzle
    }
    console.log("finishing testSolution")
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