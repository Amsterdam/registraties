import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import AccommodationObjectPage from 'containers/AccommodationObjectPage/Loadable';
import Map from 'containers/MapContainer/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Footer from 'components/Footer';
import HeaderContainer from 'containers/HeaderContainer';
import GlobalError from 'containers/GlobalError';
import { isAuthenticated } from 'shared/services/auth/auth';

import { showGlobalError } from './actions';
import reducer from './reducer';
import saga from './saga';

import GlobalStyles from '../../global-styles';

export const App = ({ showError }) => {
  useEffect(() => {
    if (!isAuthenticated()) {
      showError('unauthorized');
    }
  });

  return (
    <div className="container app-container">
      <div className="container">
        <HeaderContainer />
      </div>
      <GlobalError />
      <div className="content container">
        <Switch>
          <Route
            exact
            path="/:adresseerbaarObjectId,:nummeraanduidingId,:openbareRuimteId,:latitude,:longitude/"
            component={AccommodationObjectPage}
          />
          <Route exact path="/" component={Map} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </div>
      <div className="container-fluid">
        <Footer />
      </div>
      <GlobalStyles />
    </div>
  );
};

App.propTypes = {
  showError: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      showError: showGlobalError,
    },
    dispatch,
  );

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'global', reducer });
const withSaga = injectSaga({ key: 'global', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(App);
