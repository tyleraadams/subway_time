import React from 'react';
import PropTypes from 'prop-types';

import get from 'lodash/get';
import moment from 'moment';

import Pagination from '../pagination/pagination';

import './list.css';

const List = props => {
  return (
    <div>
      <div className="trip trip--header">
        <p>Origin</p>
        <div className="trip__time--header">
          <p>Departure</p>
        </div>
      </div>
      {props.list.map(trip => (
        <div
          key={trip.id}
          className={`trip ${trip.id === get(props, 'activeTripId')
            ? 'trip--active'
            : ''}`}
          onClick={() =>
            props.handleListItemClick(
              trip.id,
              trip.attributes.route.replace('6X', '6'),
              trip.attributes['origin-departure']
            )}
        >
          <p className="trip__destination">{trip.attributes.destination}</p>
          <div
            style={{
              display: 'flex',
              width: '40%',
              justifyContent: 'space-between'
            }}
          >
            <p>{moment(trip.attributes['origin-departure']).format('LT')}</p>

            <img
              className="trip__image"
              src={trip.attributes['route-image-url'].replace('6X', '6')}
              alt={trip.attributes.route.replace('6X', '6')}
            />
          </div>
        </div>
      ))}
      <Pagination
        links={props.links}
        getPage={props.getPage}
      />
    </div>
  );
};

List.defaultProps = {
  links: {},
  list: []
};

List.propTypes = {
  links: PropTypes.shape({}),
  getPage: PropTypes.func.isRequired,
  handleListItemClick: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({}))
};

export default List;
