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

export const target = 'mapDiv';

const Map = ({ center, coordinates, marker, search, zoom }) => {
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
  }, [coordinates, center]);

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
  /**
   * Coordinates in RD-format (https://nl.wikipedia.org/wiki/Rijksdriehoeksco%C3%B6rdinaten)
   * @see {@link https://nl.wikipedia.org/wiki/Rijksdriehoeksco%C3%B6rdinaten}
   */
  coordinates: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  /** Latitude/longitude coordinates. When used in conjunction with `coordinates`, `coordinates` will take precedence. */
  center: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
  /** When false, no search input field will be shown */
  search: PropTypes.bool,
  /** Zoom level that is applied to the visible area of the map. Maximum zoom level: 22, minimum zoom level: 11. */
  zoom: PropTypes.number,
  /** When true, a marker will be shown at the position that is indicated by either `center` or `coordinates` */
  marker: PropTypes.bool,
};

export default Map;
