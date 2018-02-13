import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import moment from 'moment';
import get from 'lodash/get';
import Map from './map/map';
import Nav from './nav/nav';

const endpoints = {
  base: 'nooklyn-interview.herokuapp.com',
  protocol: 'https://',
  trips: '/trips'
};

class TripsModel {
  static fetch(url) {
    return axios.get(url);
  }

  static fetchById(id) {
    return axios.get(
      `${endpoints.protocol}${endpoints.base}/trips/${id}/arrivals`
    );
  }

  static fetchByPage(page) {
    return axios.get(`${endpoints.protocol}${endpoints.base}${endpoints.trips}?page%5Bnumber%5D=${page}&page%5Bsize%5D=20`)
  }
}

class App extends Component {
  constructor() {
    super();
    this.getNext = this.getNext.bind(this);
    this.getPage = this.getPage.bind(this);
    this.getArrivalsForTrip = this.getArrivalsForTrip.bind(this);
    this.state = {
      trips: []
    };
  }

  componentWillMount() {
    TripsModel.fetch('https://nooklyn-interview.herokuapp.com/trips')
      .then(response => {
        this.setState({
          trips: response.data.data,
          links: response.data.links
        });
      })
      .catch(error => {
        console.error('Houston we have a problem');
      });
  }

  getNext(nextPage) {
    TripsModel.fetch(nextPage)
      .then(response => {
        this.setState({
          trips: response.data.data,
          links: response.data.links
        });
      })
      .catch(error => {
        console.error('OOPSIE');
      });
  }

  getPage(data) {
    const page = get(data, 'selected', 0) + 1;

    TripsModel.fetchByPage(page).then(response => {
        this.setState({
          trips: response.data.data,
          links: response.data.links
        });
      })
      .catch(error => {
        console.error('Houston we have a problem');
      });
  }

  getArrivalsForTrip(id, route, originDeparture) {
    TripsModel.fetchById(id)
      .then(response => {
        console.log(response.data);
        this.setState({ activeTrip: {} }, () => {
          this.setState({
            activeTrip: {
              route,
              id,
              originDeparture,
              data: response.data.data.filter(
                arrival =>
                  arrival.attributes.longitude !== null &&
                  arrival.attributes.latitutde !== null
              )
            }
          });
        });
      })
      .catch(error => {
        console.error('OOPSIE: ', error);
      });
  }

  render() {
    return (
      <div>
        <Nav links={this.state.links} getNext={this.getNext} getPage={this.getPage}/>
        <main className="app">
          <section style={{ gridColumn: '1 / 4', overflow: 'auto' }}>
            <div style={{ gridRow: '1 / 12' }}>
              {this.state.trips.map(trip => (
                <div
                  className={`trip ${trip.id ===
                  get(this.state, 'activeTrip.id')
                    ? 'trip--active'
                    : ''}`}
                  onClick={() =>
                    this.getArrivalsForTrip(trip.id, trip.attributes.route, trip.attributes['origin-departure'])}
                >
                  <p>{trip.attributes.destination}</p>
                  <p>
                    {moment(trip.attributes['origin-departure']).format('LT')}
                  </p>

                  <img
                    className="trip__image"
                    src={trip.attributes['route-image-url']}
                    alt={trip.attributes.route}
                  />
                </div>
              ))}
            </div>

          </section>

          <section style={{ gridColumn: '4 / 13' }} className="map-container">
            <Map
              departureTime={get(this.state, 'activeTrip.originDeparture')}
              markers={get(this.state, 'activeTrip.data')}
              route={get(this.state, 'activeTrip.route')}
            />
          </section>
        </main>
      </div>
    );
  }
}

export default App;
