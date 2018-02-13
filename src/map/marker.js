import React, { Component } from 'react';
import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import { compose, withStateHandlers } from 'recompose';
import moment from 'moment';
import './marker.css';

const Marker = compose(
  withStateHandlers(
    () => ({
      isOpen: false
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen
      })
    }
  )
)(props => {
  return (
    <MarkerWithLabel
      labelVisible={ props.isOpen}
      labelClass="label"
      onClick={(e) => { props.onToggleOpen() }}
      defaultZIndex={0}
      defaultAnimation={window.google.maps.Animation.DROP}
      icon={{
        path:
          'M24 14c0 6.625-5.375 12-12 12s-12-5.375-12-12 5.375-12 12-12 12 5.375 12 12z',
        anchor: new window.google.maps.Point(10, 10),
        size: new window.google.maps.Size(10, 10),
        // strokeColor: '#4E4E4E',
        fillColor: props.color,
        fillOpacity: props.isOpen ? 1 : 0.75,
        strokeWeight:  0,
        scale: 0.5,
        animation: window.google.maps.Animation.DROP,
      }}
      position={{
        lat: Number(props.marker.attributes.latitude),
        lng: Number(props.marker.attributes.longitude)
      }}
      labelAnchor={new window.google.maps.Point(-20, 0)}
      labelStyle={{
        backgroundColor: '#FFFFFF',
        fontSize: '10px',
        padding: '4px',
        zIndex: '2',
        width: '120px'
      }}
    >
      <div className="">
        <h3 className="label__station">{props.marker.attributes['station-name']}</h3>
        <p>Arrived at <time>{moment(props.marker.attributes.time).format('LT')}</time></p>
        <p>Time from departure: <time>{moment(props.marker.attributes.time).diff(moment(props.departureTime), 'minutes')}</time> minutes</p>
      </div>
    </MarkerWithLabel>
  );
});

export default Marker;
