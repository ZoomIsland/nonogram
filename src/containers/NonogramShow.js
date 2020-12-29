import React, { Component } from 'react';
import axios from 'axios';

import NonogramSolver from '../components/NonogramSolver';

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

  render() {
    return (
      // solved v unsolved switch?
      // One has solver, other has solution?
      // uncertain where "Solved" would live in the model
      <div className="showContainer">
        <NonogramSolver 
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