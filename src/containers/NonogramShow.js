import React, { Component } from 'react';
import axios from 'axios';

import NonogramSolver from '../components/NonogramSolver';

class NonogramShow extends Component {
  state = {
    nonogramData: {}
  }

  componentDidMount = () => {
    // this works for "random" or "id"
    // because of how back-end is written
    axios.get(`http://localhost:3001/nonogram/${this.props.match.params.id}`)
      .then((response) => {
        console.log(response.data)
        this.setState({nonogramData: response.data})
      })
      .catch((err) => {
        console.log(err)
      })

  }

  render() {
    return (
      // solved v unsolved switch?
      // One has solver, other has solution?
      // uncertain where "Solved" would live in the model
      <div className="showContainer">
        <NonogramSolver data={this.state.nonogramData} />
      </div>
    )
  }
}

export default NonogramShow;