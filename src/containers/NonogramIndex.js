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
    NonogramModel.getFilteredNonograms(0)
      .then((response) => {
        this.setState({nonograms: response.data.nonograms});
        this.setState({totalNonograms: response.data.length});
      })
      .catch((err) => {
        console.log(err)
      })
  }

  onPageClick = (page) => {
    NonogramModel.getFilteredNonograms(page)
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
    console.log(e.target.value)
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