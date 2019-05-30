import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { intlShape } from 'react-intl';

import CONFIGURATION from 'shared/services/configuration/configuration';
import LoginIcon from '@datapunt/asc-assets/lib/Icons/Login.svg';
import LogoutIcon from '@datapunt/asc-assets/lib/Icons/Logout.svg';
import { Header as HeaderComponent } from '@datapunt/asc-ui';
import messages from './messages';

const StyledHeader = styled(HeaderComponent)`
  max-width: 1080px;
  margin: 0 auto;

  a {
    line-height: normal;
  }

  h1 {
    padding: 0 !important;

    a {
      font-weight: normal !important;
    }
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
    right: 0;

    .login-adw,
    span {
      display: none;
    }
  }
`;

const Header = ({ isAuthenticated, intl, onLoginLogoutButtonClick }) => (
  <HeaderWrapper>
    <StyledHeader title="Registraties" homeLink={CONFIGURATION.ROOT} tall>
      <StyledNav className="no-print">
        <ul className="links horizontal">
          {!isAuthenticated && (
            <>
              <li>
                <button className="login" type="button" onClick={event => onLoginLogoutButtonClick(event, 'datapunt')}>
                  <LoginIcon focusable="false" width={20} />
                  <span>{intl.formatMessage(messages.log_in)}</span>
                </button>
              </li>
              <li>
                <button className="login-adw" type="button" onClick={event => onLoginLogoutButtonClick(event, 'grip')}>
                  <LoginIcon focusable="false" width={20} />
                  <span>{intl.formatMessage(messages.log_in_adw)}</span>
                </button>
              </li>
            </>
          )}
          {isAuthenticated ? (
            <li>
              <button type="button" onClick={onLoginLogoutButtonClick}>
                <LogoutIcon focusable="false" width={20} />
                <span>{intl.formatMessage(messages.log_out)}</span>
              </button>
            </li>
          ) : (
            ''
          )}
        </ul>
      </StyledNav>
    </StyledHeader>
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
