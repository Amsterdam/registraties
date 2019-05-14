import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Map from '../../components/Map';
import reducer from './reducer';
import saga from './saga';
import { searchSelect } from './actions';

const MapContainer = ({ onSelect }) => (
  <Fragment>
    <Map
      onSearchSelect={response => {
        onSelect(response);
      }}
      center={{ latitude: 52.372829, longitude: 4.900773 }}
    />
  </Fragment>
);

MapContainer.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onSelect: searchSelect,
    },
    dispatch,
  );

const withConnect = connect(
  null,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'map', reducer });
const withSaga = injectSaga({ key: 'map', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MapContainer);
