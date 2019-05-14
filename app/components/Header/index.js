import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { intlShape } from 'react-intl';

import SearchContainer from 'containers/Search';
import CONFIGURATION from 'shared/services/configuration/configuration';
import loginIcon from '@datapunt/asc-assets/lib/Icons/Login.svg';
import logoutIcon from '@datapunt/asc-assets/lib/Icons/Logout.svg';
import { Header as HeaderComponent, Icon } from '@datapunt/asc-ui';
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

    & > * {
      vertical-align: middle;
      margin-right: 5px;
    }

    &:hover {
      color: #ec0000;
      text-decoration: underline;
    }
  }
`;

const Header = ({ isAuthenticated, intl, onLoginLogoutButtonClick }) => (
  <HeaderWrapper>
    <StyledHeader title="Basisregistratie Wonen" homeLink={CONFIGURATION.ROOT} tall fullWidth>
      <SearchContainer />

      <StyledNav className="no-print">
        <ul className="links horizontal">
          {!isAuthenticated && (
            <>
              <li>
                <button type="button" onClick={event => onLoginLogoutButtonClick(event, 'datapunt')}>
                  <Icon iconUrl={`url('${loginIcon}');`} padding={0} inline />
                  {intl.formatMessage(messages.log_in)}
                </button>
              </li>
              <li>
                <button type="button" onClick={event => onLoginLogoutButtonClick(event, 'grip')}>
                  <Icon iconUrl={`url('${loginIcon}');`} padding={0} inline />
                  {intl.formatMessage(messages.log_in_adw)}
                </button>
              </li>
            </>
          )}
          {isAuthenticated ? (
            <li>
              <button type="button" onClick={onLoginLogoutButtonClick}>
                <Icon iconUrl={`url('${logoutIcon}');`} padding={0} inline />
                {intl.formatMessage(messages.log_out)}
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
