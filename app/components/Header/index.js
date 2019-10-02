import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { intlShape } from 'react-intl';

import CONFIGURATION from 'shared/services/configuration/configuration';
import { Login, Logout } from '@datapunt/asc-assets';
import { Header as HeaderComponent } from '@datapunt/asc-ui';
import messages from './messages';

const StyledHeader = styled(HeaderComponent)`
  max-width: 1080px;
  a {
    font-family: Avenir Next LT W01 Demi;
    font-weight: 400;
  }
`;

const HeaderWrapper = styled.div`
  position: relative;
  z-index: 2;

  @media (min-width: 1200px) {
    z-index: 0;
  }
`;

const StyledNav = styled.nav`
  position: absolute;
  top: 5px;
  right: 20px;
  z-index: 101;

  button {
    appearance: none;
    background: none;
    border: 0;
    cursor: pointer;

    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
      height: 30px;
    }

    & > * {
      vertical-align: middle;
      margin-right: 5px;
    }

    &:hover,
    &:focus {
      color: #ec0000;
      text-decoration: underline;

      svg {
        fill: #ec0000;
      }
    }
  }

  @media (max-width: 720px) {
    top: 0;
    right: 0;

    button {
      width: 50px;
      height: 50px;
      padding: 0;
    }

    .links li {
      margin: 0;
    }

    .login-adw,
    span {
      display: none;
    }
  }
`;

const Header = ({ isAuthenticated, intl, onLoginLogoutButtonClick }) => (
  <HeaderWrapper data-testid="site-header">
    <StyledHeader
      tall
      fullWidth={false}
      title="Registraties"
      homeLink={CONFIGURATION.ROOT}
      navigation={
        <StyledNav className="no-print">
          <ul className="links horizontal">
            <li>
              {isAuthenticated ? (
                <button type="button" onClick={onLoginLogoutButtonClick}>
                  <Logout focusable="false" width={20} />
                  <span>{intl.formatMessage(messages.log_out)}</span>
                </button>
              ) : (
                <button className="login" type="button" onClick={event => onLoginLogoutButtonClick(event, 'datapunt')}>
                  <Login focusable="false" width={20} />
                  <span>{intl.formatMessage(messages.log_in)}</span>
                </button>
              )}
            </li>
          </ul>
        </StyledNav>
      }
    />
  </HeaderWrapper>
);

Header.defaultProps = {
  isAuthenticated: false,
  onLoginLogoutButtonClick: undefined,
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool,
  intl: intlShape.isRequired,
  onLoginLogoutButtonClick: PropTypes.func,
};

export default Header;
