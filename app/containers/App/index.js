import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import AccommodationObjectPage from 'containers/AccommodationObjectPage/Loadable';
import Map from 'containers/MapContainer/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Footer from 'components/Footer';
import HeaderContainer from 'containers/HeaderContainer';
import GlobalError from 'containers/GlobalError';
import { isAuthenticated } from 'shared/services/auth/auth';

import reducer from './reducer';
import saga from './saga';

import GlobalStyles from '../../global-styles';

export const App = () => (
  <div className="container app-container">
    <GlobalError />
    <div className="container">
      <HeaderContainer />
    </div>
    <div className="content container">
      <Switch>
        <Route exact path="/" component={Map} />
        {!isAuthenticated() && <Redirect to="/" />}
        <Route
          exact
          path="/:natRegId,:adresseerbaarObjectId,:nummeraanduidingId,:openbareRuimteId,:latitude,:longitude/"
          component={AccommodationObjectPage}
        />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </div>
    <div className="container-fluid">
      <Footer />
    </div>
    <GlobalStyles />
  </div>
);

const withReducer = injectReducer({ key: 'global', reducer });
const withSaga = injectSaga({ key: 'global', saga });

export default compose(
  withReducer,
  withSaga,
)(App);
