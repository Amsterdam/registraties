import React, { Fragment } from 'react';
import Map from '../../components/Map';

const MapContainer = () => (
  <Fragment>
    <Map latlng={{ latitude: '52.372829', longitude: '4.900773' }} />
  </Fragment>
);

export default MapContainer;
