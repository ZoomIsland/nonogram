import React, { Component } from 'react';
import axios from 'axios';

import NonogramSolver from '../components/NonogramSolver';

class NonogramShow extends Component {
  state = {
    nonogramData: {},
    colors: [],
    selectedColorIndex: 0,
    currentAttempt: []
  }

  componentDidMount = () => {
    // this works for "random" or "id"
    // because of how back-end is written
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
          currentAttempt={this.state.currentAttempt}
        />
      </div>
    )
  }
}

export default NonogramShow;