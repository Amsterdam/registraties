import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import { isAuthenticated } from 'shared/services/auth/auth';

import { makeSelectUserName } from 'containers/App/selectors';
import { doLogin, doLogout } from 'containers/App/actions';
import Header from 'components/Header';

const IntlHeader = injectIntl(Header);

export const HeaderContainerComponent = ({ onLogin, onLogout, userName }) => {
  const onLoginLogoutButtonClick = (event, domain) => {
    if (!isAuthenticated()) {
      onLogin(domain);
    } else {
      onLogout();
    }
  };

  return (
    <IntlHeader
      isAuthenticated={isAuthenticated()}
      onLoginLogoutButtonClick={onLoginLogoutButtonClick}
      userName={userName}
    />
  );
};

HeaderContainerComponent.propTypes = {
  userName: PropTypes.string,
  onLogin: PropTypes.func,
  onLogout: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userName: makeSelectUserName,
});

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onLogin: doLogin,
      onLogout: doLogout,
    },
    dispatch,
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HeaderContainerComponent);
