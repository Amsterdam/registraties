import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import amaps from 'amsterdam-amaps/dist/amaps';
import 'amsterdam-amaps/dist/nlmaps/dist/assets/css/nlmaps.css';
import 'leaflet/dist/leaflet.css';

const MapContainer = styled.div`
  height: 450px;
  width: 100%;
`;
class Map extends Component {
  componentDidMount() {
    const { center, onSearchSelect } = this.props;

    amaps.createMap({
      center,
      target: 'mapdiv',
      search: true,
      zoom: 13,
    });

    amaps.on('search-select', searchSelect => {
      onSearchSelect(searchSelect);
    });
  }

  componentWillUnmount() {
    amaps.on('search-select', () => {});
  }

  render() {
    return (
      <MapContainer>
        <div id="mapdiv" style={{ height: '100%' }} />
      </MapContainer>
    );
  }
}

Map.propTypes = {
  center: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
  onSearchSelect: PropTypes.func.isRequired,
};

export default Map;
