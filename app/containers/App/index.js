import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AccommodationObjectPage from 'containers/AccommodationObjectPage';
import HomePage from 'containers/HomePage';
import NotFoundPage from 'containers/NotFoundPage';
import Footer from 'components/Footer';
import Header from 'containers/Header';
import GlobalError from 'containers/GlobalError';
import { authenticate, isAuthenticated } from 'shared/services/auth/auth';
import Search from 'containers/Search';
import injectSaga from 'utils/injectSaga';

import { ThemeProvider } from '@datapunt/asc-ui';

import { showGlobalError, authenticateUser } from './actions';
import saga from './saga';

import GlobalStyles from '../../global-styles';
import { URL_ROUTE_PREFIX_VBO, URL_ROUTE_PREFIX_LIG, URL_ROUTE_PREFIX_BRK } from '../../utils/routing/constants';

export const App = ({ onAuthenticateUser, showError }) => {
  const { pathname } = document.location;
  const show = !/\d+\/$/.test(pathname);

  useEffect(() => {
    const credentials = authenticate();
    onAuthenticateUser(credentials);

    if (!isAuthenticated()) {
      showError('unauthorized');
    }
  });

  return (
    <ThemeProvider>
      <div className="container app-container">
        <Header />
        <Search show={show} />
        <GlobalError />
        <main className="content container">
          <Switch>
            <Route exact path={`/${URL_ROUTE_PREFIX_VBO}/:vboId/`} component={AccommodationObjectPage} />
            <Route exact path={`/${URL_ROUTE_PREFIX_LIG}/:ligId/`} component={AccommodationObjectPage} />
            <Route exact path={`/${URL_ROUTE_PREFIX_BRK}/:brkId/`} component={AccommodationObjectPage} />
            <Route exact path="/" component={HomePage} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
        <div className="container-fluid">
          <Footer />
        </div>
        <GlobalStyles />
      </div>
    </ThemeProvider>
  );
};

App.propTypes = {
  onAuthenticateUser: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      showError: showGlobalError,
      onAuthenticateUser: authenticateUser,
    },
    dispatch,
  );

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  injectSaga({ key: 'global', saga }),
  withConnect,
)(App);
