import React from 'react';
import PropTypes from 'prop-types';

import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Polyline
} from 'react-google-maps';

import { compose, withProps } from 'recompose';

import Marker from './marker';
import mapSettings from './map_settings';
import { getColor, shadeBlend } from './get_color';
import credentials from '../credentials.json';

const compare = (prev, curr) => {
  return new Date(prev.attributes.time) - new Date(curr.attributes.time);
};

const MapWrapper = compose(
  withProps({
    googleMapURL:
      `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${credentials.googleMapsKey}&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `calc(100vh - 33px)` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  const activeLineColor = getColor(props.route);
  const activeMarkerColor = props.route
    ? shadeBlend(0.35, activeLineColor)
    : '';
  const centerPoint = props.markers.reduce(
    function(acc, curr, currIndex, arr) {
      if (currIndex === arr.length - 1) {
        return {
          lat: (acc[0] + Number(curr.attributes.latitude)) / arr.length,
          lng: (acc[1] + Number(curr.attributes.longitude)) / arr.length
        };
      }

      return [
        acc[0] + Number(curr.attributes.latitude),
        acc[1] + Number(curr.attributes.longitude)
      ];
    },
    [0, 0]
  );

  const combinedSettings =
    centerPoint[0] !== 0
      ? Object.assign({}, mapSettings, { center: centerPoint, zoom: 11 })
      : mapSettings;

  return (
    // https://mapstyle.withgoogle.com/
    <GoogleMap {...combinedSettings}>
      <Polyline
        path={props.markers.sort(compare).map(marker => {
          return {
            lat: Number(marker.attributes.latitude),
            lng: Number(marker.attributes.longitude)
          };
        })}
        options={{ strokeColor: activeLineColor }}
      />
      {props.markers.map((marker, idx) => {
        return (
          <Marker
            handleClick={props.handleClick}
            index={idx}
            key={idx}
            color={activeMarkerColor}
            marker={marker}
            departureTime={props.departureTime}
            isOpen={idx === props.activeMarkerIndex}
          />
        );
      })}
    </GoogleMap>
  );
});

MapWrapper.defaultProps = {
  markers: [],
  activeMarkerIndex: -1,
  route: '',
  departureTime: ''
};

MapWrapper.propTypes = {
  activeMarkerIndex: PropTypes.number,
  handleClick: PropTypes.func.isRequired,
  route: PropTypes.string,
  markers: PropTypes.arrayOf(PropTypes.shape({})),
  departureTime: PropTypes.string
};

export default MapWrapper;
