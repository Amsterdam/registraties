import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Map from '../../components/Map';

const MapContainer = withRouter(({ history }) => (
  <Fragment>
    <Map
      onSearchSelect={({ resultObject }) => {
        const {
          adresseerbaarobject_id: adresseerbaarobjectId,
          nummeraanduiding_id: nummeraanduidingId,
          openbareruimte_id: openbareruimteId,
        } = resultObject;

        history.push(`/${adresseerbaarobjectId}-${nummeraanduidingId}-${openbareruimteId}/`);
      }}
      center={{ latitude: 52.372829, longitude: 4.900773 }}
    />
  </Fragment>
));

export default MapContainer;
