import React, { Component } from 'react';
import PropTypes from 'prop-types';

import amaps from 'amsterdam-amaps/dist/amaps';
import 'amsterdam-amaps/dist/nlmaps/dist/assets/css/nlmaps.css';
import 'leaflet/dist/leaflet.css';

import { rdToWgs84 } from 'shared/services/crs-converter/crs-converter';

class Map extends Component {
  componentDidMount() {
    const { center, coords, marker, onSearchSelect, search, zoom } = this.props;

    let points = center;

    if (coords) {
      points = rdToWgs84(coords);
    }

    this.map = amaps.createMap({
      center: points,
      marker,
      search,
      target: 'mapdiv',
      zoom,
    });

    amaps.on('search-select', searchSelect => {
      onSearchSelect(searchSelect);
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return <div id="mapdiv" style={{ height: '100%' }} />;
  }
}

Map.defaultProps = {
  center: null,
  coords: null,
  marker: false,
  onSearchSelect: () => {},
  search: true,
  zoom: 13,
};

Map.propTypes = {
  coords: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  center: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
  onSearchSelect: PropTypes.func,
  search: PropTypes.bool,
  zoom: PropTypes.number,
  marker: PropTypes.bool,
};

export default Map;
