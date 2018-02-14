import React, { Component } from 'react';

import get from 'lodash/get';

import TripsModel from './trips_model';

import Map from '../map/map';
import Nav from '../nav/nav';
import List from '../list/list';

import './app.css';

class App extends Component {
  constructor() {
    super();

    this.getPage = this.getPage.bind(this);
    this.getArrivalsForTrip = this.getArrivalsForTrip.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.state = {
      trips: []
    };
  }

  componentWillMount() {
    TripsModel.fetchAll()
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

  handleMapClick(idx) {
    this.setState({ activeMarkerIndex: idx });
  }

  getPage(data) {
    const page = get(data, 'selected', 0) + 1;

    TripsModel.fetchByPage(page)
      .then(response => {
        this.setState({
          trips: response.data.data,
          links: response.data.links
        });
      })
      .catch(error => {
        console.error('Houston we have a problem: ', error);
      });
  }

  getArrivalsForTrip(id, route, originDeparture) {
    TripsModel.fetchArrivalsById(id)
      .then(response => {
        this.setState({ activeTrip: {}, activeMarkerIndex: null }, () => {
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
      <div className="app">
        <Nav />
        <main>
          <section className="list-wrapper">
            <List
              links={this.state.links}
              getPage={this.getPage}
              list={this.state.trips}
              handleListItemClick={this.getArrivalsForTrip}
              activeTripId={get(this.state, 'activeTrip.id')}
            />
          </section>

          <section className="map-container">
            <Map
              departureTime={get(this.state, 'activeTrip.originDeparture')}
              markers={get(this.state, 'activeTrip.data')}
              route={get(this.state, 'activeTrip.route')}
              handleClick={this.handleMapClick}
              activeMarkerIndex={get(this.state, 'activeMarkerIndex')}
            />
          </section>
        </main>
      </div>
    );
  }
}

export default App;
