import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { Marker, InfoWindow } from 'react-google-maps';

import './marker.css';

const InfoMarker = props => {
  return (
    <Marker
      onClick={() => props.handleClick(props.index)}
      defaultZIndex={0}
      defaultAnimation={window.google.maps.Animation.DROP}
      icon={{
        path:
          'M24 14c0 6.625-5.375 12-12 12s-12-5.375-12-12 5.375-12 12-12 12 5.375 12 12z',
        anchor: new window.google.maps.Point(10, 10),
        size: new window.google.maps.Size(10, 10),
        fillColor: props.color,
        fillOpacity: props.isOpen ? 1 : 0.5,
        strokeWeight: 0,
        scale: 0.5,
        animation: window.google.maps.Animation.DROP
      }}
      position={{
        lat: Number(props.marker.attributes.latitude),
        lng: Number(props.marker.attributes.longitude)
      }}
    >
      {props.isOpen && (
        <InfoWindow>
          <div>
            <div className="label">
              <div className="label__grid-item">
                <h3 className="label__header">Station</h3>
              </div>
              <div className="label__grid-item">
                <h3 className="label__header">Arrived</h3>
              </div>
              <div className="label__grid-item">
                <h3 className="label__header">Elapsed</h3>
              </div>
              <div className="label__grid-item">
                <p className="label__value">
                  {props.marker.attributes['station-name']}
                </p>
              </div>
              <div className="label__grid-item">
                <p className="label__value">
                  <time>
                    {moment(props.marker.attributes.time).format('LT')}
                  </time>
                </p>
              </div>
              <div className="label__grid-item">
                <p className="label__value">
                  <time>
                    {moment(props.marker.attributes.time).diff(
                      moment(props.departureTime),
                      'minutes'
                    )}{' '}
                    minutes
                  </time>
                </p>
              </div>
            </div>
          </div>
        </InfoWindow>
      )}
    </Marker>
  );
};

InfoMarker.defaultProps = {
  color: '',
  departureTime: '',
  isOpen: false
};

InfoMarker.propTypes = {
  handleClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  marker: PropTypes.shape({}).isRequired,
  departureTime: PropTypes.string,
  isOpen: PropTypes.bool
};

export default InfoMarker;
