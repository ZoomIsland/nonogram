import React, { Component } from 'react';

import NonogramIndexShow from '../components/NonogramIndexShow';
import Pagination from '../components/Pagination';
import IndexFilters from '../components/IndexFilters';
import NonogramModel from '../models/nonograms';

class NonogramIndex extends Component {
  state = {
    nonograms: [],
    totalNonograms: 0,
    orderBy: "newest",
    currentPage: 0
  }

  componentDidMount = () => {
    NonogramModel.getFilteredNonograms(0, this.state.orderBy)
      .then((response) => {
        this.setState({nonograms: response.data.nonograms});
        this.setState({totalNonograms: response.data.length});
      })
      .catch((err) => {
        console.log(err)
      })
  }

  onPageClick = (page) => {
    NonogramModel.getFilteredNonograms(page, this.state.orderBy)
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
  onSelectChange = (e) => {
    this.setState({orderBy: e.target.value});
    this.setState({currentPage: 0})
    NonogramModel.getFilteredNonograms(0, e.target.value)
    .then((response) => {
      this.setState({nonograms: response.data.nonograms});
      this.setState({totalNonograms: response.data.length});
    })
    .catch((err) => {
      console.log(err)
    })
  }

  render() {
    const nonogramList = this.state.nonograms.map(nono => {
      return (
        <NonogramIndexShow data={nono} />
      )
    })

    return (
      <div>
        <IndexFilters onSelectChange={this.onSelectChange} />
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