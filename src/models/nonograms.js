import axios from 'axios';

class NonogramModel {
  static getFilteredNonograms = (page) => {
    return axios.get(`http://localhost:3001/nonogram/index/${page}`)
  }
  // this works for :id or "random"
  static getSingleNonogram = (id) => {
    return axios.get(`http://localhost:3001/nonogram/${id}`)
  }
}

export default NonogramModel;