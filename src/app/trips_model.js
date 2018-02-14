import axios from 'axios';

const apiUrlParts = {
  base: 'nooklyn-interview.herokuapp.com',
  protocol: 'https://',
  trips: '/trips'
};

class TripsModel {
  static fetchAll() {
    return axios.get(
      `${apiUrlParts.protocol}${apiUrlParts.base}${apiUrlParts.trips}`
    );
  }

  static fetchArrivalsById(id) {
    return axios.get(
      `${apiUrlParts.protocol}${apiUrlParts.base}${apiUrlParts.trips}/${id}/arrivals`
    );
  }

  static fetchByPage(page) {
    return axios.get(
      `${apiUrlParts.protocol}${apiUrlParts.base}${apiUrlParts.trips}?page%5Bnumber%5D=${page}&page%5Bsize%5D=20`
    );
  }
}

export default TripsModel;
