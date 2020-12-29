import React, { Component } from 'react';
import axios from 'axios';

import NonogramIndexShow from '../components/NonogramIndexShow';

class NonogramIndex extends Component {
  state = {
    nonograms: []
  }

  componentDidMount = () => {
    // make an axios call for page 1 of ALL Nonograms
    axios.get("http://localhost:3001/nonogram/")
      .then((response) => {
        console.log(response.data)
        this.setState({nonograms: response.data})
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // when filters change, update state nonograms

  render() {
    const nonogramList = this.state.nonograms.map(nono => {
      return (
        <NonogramIndexShow data={nono} />
      )
    })

    return (
      <div>This is the index
        {nonogramList}
      </div>
    )
  }
}

export default NonogramIndex;