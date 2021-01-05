import axios from 'axios';

class NonogramModel {
  static getFilteredNonograms = (page, filter) => {
    return axios.get(`http://localhost:3001/nonogram/index/${page}`)
  }
}

export default NonogramModel;