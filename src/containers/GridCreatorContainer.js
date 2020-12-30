import React, { Component } from 'react';
import axios from 'axios';

import CreatorGrid from '../components/Grids/CreatorGrid'

import './GridCreator.css';

class GridCreatorContainer extends Component {
  state = {
    nonogramName: "Untitled Nonogram",
    gridHeight: 15,
    gridWidth: 15,
    gridColors: [],
    gridAnswer: [],
    selectedColorIndex: 0,
    editingColor: false,
    fillType: "",
    startDraw: ""
  }

  componentDidMount = () => {
    // if utilizing for editing,
    // adjust below to an if statement (if new or api call is empty...)

    //creating first color
    const firstColor = this.getRandomColor();
    let colorArray = [firstColor];
    this.setState({gridColors: colorArray});

    // creating grid of all Xs
    let gridArray = [];
    for (let i = 0; i < this.state.gridHeight; i++) {
      let rowArray = [];
      for (let j = 0; j < this.state.gridWidth; j++) {
        rowArray.push("X");
      }
      gridArray.push(rowArray)
    }
    // console.log(gridArray)
    this.setState({gridAnswer: gridArray});
  }

  onTitleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = () => {
    // alert: ask if they're ready to submit...

    // construct object for submission
    // this will need user info eventually
    const newNono = {
      title: this.state.nonogramName,
      height: this.state.gridHeight,
      width: this.state.gridWidth,
      nonogramArray: this.state.gridAnswer,
      // nonogramString: this.state.gridAnswer.flat().join(''),
      colorArray: this.state.gridColors,
    }
    console.log(newNono);

    // send object to api
    return axios.post("http://localhost:3001/nonogram/", newNono)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err)
      }) 

    // reroute page to Show page of that Nonogram?
  }

  getRandomColor = () => {
    // function that returns a random hex value;
    let colorConstructor = "#";

    const hexValues ="0123456789ABCDEF";
    for (let i = 0; i < 6; i++) {
      let randIndex = Math.floor(Math.random() * hexValues.length);
      let chosenVal = hexValues.charAt(randIndex);
      colorConstructor += chosenVal;
    }
    if (colorConstructor === "#FFFFFF") {
      colorConstructor = this.getRandomColor();
    }
    // console.log(colorConstructor)
    return colorConstructor;
  }

  onAddColorClick = () => {
    // console.log("plus clicked!");
    let colorArray = [...this.state.gridColors];
    const randomHex = this.getRandomColor();
    colorArray.push(randomHex);
    this.setState({gridColors: colorArray});
    this.setState({selectedColorIndex: colorArray.length - 1});
    this.setState({editingColor: true});
  }

  onColorClick = (index) => {
    if (index !== this.state.selectedColorIndex) {
      this.setState({selectedColorIndex: index})
    } else {
      // open the color editor
      // console.log("editor opens")
      this.setState({editingColor: true});
    }
  }

  onColorEditorClose = () => {
    this.setState({editingColor: false})
  }

  onColorChange = (color) => {
    // console.log(color.hex);
    let colorArray = [...this.state.gridColors];
    colorArray[this.state.selectedColorIndex] = color.hex;
    this.setState({gridColors: colorArray});
  }

  // I'll likely want to revise this to an onDrag for each
  // where it removes the visibility of the column/row at first
  // then modifies on mouseup
  onColumnPlus = () => {
    let answerArray = [...this.state.gridAnswer];
    for (let i = 0; i < answerArray.length; i++) {
      answerArray[i].push("X");
    }
    this.setState({gridAnswer: answerArray});
    this.setState({gridWidth: this.state.gridWidth + 1});
  }
  onColumnMinus = () => {
    // if (this.state.gridAnswer[0].length > 5) {
      let answerArray = [...this.state.gridAnswer];
      for (let i = 0; i < answerArray.length; i++) {
        answerArray[i].pop();
      }
      this.setState({gridAnswer: answerArray});
      this.setState({gridWidth: this.state.gridWidth - 1});
    // }
  }
  onRowPlus = () => {
    let newRow = [];
    let answerArray = [...this.state.gridAnswer];
    for (let i = 0; i < answerArray[0].length; i++) {
      newRow.push("X");
    }
    answerArray.push(newRow);
    this.setState({gridAnswer: answerArray});
    this.setState({gridHeight: this.state.gridHeight + 1});
  }
  onRowMinus = () => {
    let answerArray = [...this.state.gridAnswer];
    answerArray.pop();
    this.setState({gridAnswer: answerArray});
    this.setState({gridHeight: this.state.gridHeight - 1});
  }

  parsePositionAndSetFill = (positionStr, type) => {
    const midpoint = positionStr.indexOf("c");
    const row = parseInt(positionStr.substring(1, midpoint));
    const column = parseInt(positionStr.substring(midpoint + 1, positionStr.length));

    const updatedAnswer = [...this.state.gridAnswer];
    if (type === 1 && this.state.selectedColorIndex === updatedAnswer[row][column]) {
      this.setState({fillType: "X"});
      return "X";
    } else if (type === 1) {
      this.setState({fillType: "index"});
      return "index";
    } else if (type === 3) {
      this.setState({fillType: "X"});
      return "X";
    }
  }

  parsePositionAndSetState = (positionStr, fillType = "") => {
    const midpoint = positionStr.indexOf("c");
    const row = parseInt(positionStr.substring(1, midpoint));
    const column = parseInt(positionStr.substring(midpoint + 1, positionStr.length));

    const updatedAnswer = [...this.state.gridAnswer];
   if (this.state.fillType === "index" || fillType === "index") {
      updatedAnswer[row][column] = this.state.selectedColorIndex;
    } else if (this.state.fillType === "X" || fillType === "X") {
      updatedAnswer[row][column] = "X";
    }
    this.setState({gridAnswer: updatedAnswer})
  }

  onMouseDownOnBox = (e) => {
    const clickType = e.nativeEvent.which;
    this.setState({startDraw: e.target.id})
    const fillType = this.parsePositionAndSetFill(e.target.id, clickType)
    this.parsePositionAndSetState(e.target.id, fillType);
    // console.log(e.target.id);
  }

  onMouseEnterBox = (e) => {
    if (this.state.startDraw.length) {
      // console.log(e.target.id);
      this.parsePositionAndSetState(e.target.id)
    }    
  }

  onMouseUpOnBox = () => {
    this.setState({fillType: ""})
    this.setState({startDraw: ""})
  }  

  render() {
    return (
      <div className="creatorContainer">
        <div className="titleContainer" onClick={this.onTitleClick}>
          <input className="titleInput" type="text" name="nonogramName" value={this.state.nonogramName} onChange={this.onTitleChange} />
          <button className="submitBtn" onClick={this.onSubmit}>Submit Nonogram</button>
        </div>
        <CreatorGrid
          gridColors={this.state.gridColors}
          selectedColorIndex={this.state.selectedColorIndex}
          gridAnswer={this.state.gridAnswer}
          onAddColorClick={this.onAddColorClick}
          onColorClick={this.onColorClick}
          editingColor={this.state.editingColor}
          onColorChange={this.onColorChange}
          onColorEditorClose={this.onColorEditorClose}
          onMouseDownOnBox={this.onMouseDownOnBox}
          onMouseEnterBox={this.onMouseEnterBox}
          onMouseUpOnBox={this.onMouseUpOnBox}
          onColumnPlus={this.onColumnPlus}
          onColumnMinus={this.onColumnMinus}
          onRowPlus={this.onRowPlus}
          onRowMinus={this.onRowMinus} />
      </div>
    )
  }
}

export default GridCreatorContainer;