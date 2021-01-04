import React, { Component } from 'react';
import axios from 'axios';
// import { useParams } from 'react-router-dom';

import NonogramIndexShow from '../components/NonogramIndexShow';
import Pagination from '../components/Pagination';

class NonogramIndex extends Component {
  state = {
    nonograms: [],
    totalNonograms: 0,
    currentPage: 0
  }

  componentDidMount = () => {
    // make an axios call for page 1 of ALL Nonograms
    axios.get("http://localhost:3001/nonogram/index/0")
      .then((response) => {
        this.setState({nonograms: response.data.nonograms});
        this.setState({totalNonograms: response.data.length});
      })
      .catch((err) => {
        console.log(err)
      })
  }

  onPageClick = (page) => {
    axios.get(`http://localhost:3001/nonogram/index/${page}`)
      .then((response) => {
        this.setState({nonograms: response.data.nonograms});
        this.setState({totalNonograms: response.data.length});
        this.setState({currentPage: page});
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
      <div>
        <div className="filters">
          Filters will live here eventually...
        </div>
        <Pagination 
          totalNonograms={this.state.totalNonograms} 
          onPageClick={this.onPageClick}
          currentPage={this.state.currentPage} />
        {nonogramList}
        <Pagination 
          totalNonograms={this.state.totalNonograms} 
          onPageClick={this.onPageClick}
          currentPage={this.state.currentPage} />
      </div>
    )
  }
}

export default NonogramIndex;