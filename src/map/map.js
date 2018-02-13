import React, { Component } from 'react';

import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Polyline
} from 'react-google-maps';
import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import { compose, withProps } from 'recompose';
import Marker from './marker';
import mapSettings from './map_settings';
import { getColor, shadeBlend } from './get_color';

const compare = (prev, curr) => {
  return new Date(prev.attributes.time) - new Date(curr.attributes.time);
};

const MapWrapper = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDxVWTSFnrmnuiKm5gIy-_EUWeRZiSm2_Q&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  const activeLineColor = getColor(props.route);
  const activeMarkerColor = props.route ? shadeBlend(0.85, activeLineColor) : '';
  const centerPoint = props.markers.reduce(
    function(acc, curr, currIndex, arr) {
      if (currIndex === arr.length - 1) {
        return {
          lat: (acc[0] + Number(curr.attributes.latitude)) / arr.length,
          lng: (acc[1] + Number(curr.attributes.longitude)) / arr.length
        };
      }

      return [
        (acc[0] + Number(curr.attributes.latitude)),
        (acc[1] + Number(curr.attributes.longitude))
      ];
    },
    [0, 0]
  );

  const combinedSettings = centerPoint[0] !== 0 ? Object.assign({}, mapSettings, { center: centerPoint, zoom: 11 }) : mapSettings;

  return (
    // https://mapstyle.withgoogle.com/
    <div>
      <aside> <h3 className="label__station">{/*props.marker.attributes['station-name'] */}</h3>
        <p>Arrived at <time>{/*moment(props.marker.attributes.time).format('LT') */}</time></p>
        <p>Time from departure: <time>{/*moment(props.marker.attributes.time).diff(moment(props.departureTime), 'minutes') */}</time> minutes</p></aside>
    <GoogleMap {...combinedSettings} >

      <Polyline
        path={props.markers.sort(compare).map(marker => {
          return {
            lat: Number(marker.attributes.latitude),
            lng: Number(marker.attributes.longitude)
          };
        })}
        options={{ strokeColor: activeLineColor }}
      />
      {props.markers.map(marker => {
        return <Marker color={activeMarkerColor} marker={marker} departureTime={props.departureTime} />;
      })}
    </GoogleMap>
    </div>
  );
});

MapWrapper.defaultProps = {
  markers: []
};

export default MapWrapper;
