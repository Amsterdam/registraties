import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import amaps from 'amsterdam-amaps/dist/amaps';
import 'amsterdam-amaps/dist/nlmaps/dist/assets/css/nlmaps.css';
import 'leaflet/dist/leaflet.css';

import { rdToWgs84 } from 'shared/services/crs-converter/crs-converter';

export const MapWrapper = styled.div`
  height: 200px;
  width: 100%;
  position: relative;
  z-index: 0;
`;

const Map = ({ center, coordinates, marker, search, zoom }) => {
  const target = 'mapDiv';

  useEffect(() => {
    let points = center;

    if (coordinates) {
      points = rdToWgs84(coordinates);
    }

    if (points) {
      amaps.createMap({
        center: points,
        marker,
        search,
        target,
        zoom,
      });
    }

    return () => {
      // clear mapDiv contents; amaps creates a new placeholder with every component re-render
      const mapDiv = document.getElementById(target);
      while (mapDiv.firstChild) {
        mapDiv.removeChild(mapDiv.firstChild);
      }
    };
  }, []);

  return (
    <section>
      <MapWrapper className="cf">
        <div id={target} style={{ height: '100%' }} />
      </MapWrapper>
    </section>
  );
};

Map.defaultProps = {
  center: null,
  coordinates: null,
  marker: false,
  search: true,
  zoom: 13,
};

Map.propTypes = {
  coordinates: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  center: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
  search: PropTypes.bool,
  zoom: PropTypes.number,
  marker: PropTypes.bool,
};

export default Map;
