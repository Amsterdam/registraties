import React from 'react';
import PropTypes from 'prop-types';
import CONFIGURATION from 'shared/services/configuration/configuration';

import './style.scss';
import LogoSvg from '../../../node_modules/amsterdam-stijl/dist/images/logos/andreas.svg';
import LogoPng from '../../../node_modules/amsterdam-stijl/dist/images/logos/andreas.png';
import LogoPrint from '../../../node_modules/amsterdam-stijl/dist/images/logos/andreas-print.png';

const Header = ({ isAuthenticated, userName, onLoginLogoutButtonClick }) => (
  <div className="header-component has_header_modern no-print">
    <div className="row header-wrapper">
      <header className="col-sm-6 grid-header-logo">
        <h1 className="sitelogo">
          <a className="mainlogo" href={CONFIGURATION.ROOT}>
            <span className="logoset">
              <img src={LogoSvg} className="screen-logo" alt="Gemeente Amsterdam" />
              <img src={LogoPng} className="alt-logo" alt="Gemeente Amsterdam" />
              <img src={LogoPrint} className="print-logo" alt="Gemeente Amsterdam" />
            </span>
            <span className="logotexts">
              <span className="logotext red">Gemeente</span>
              <span className="logotext red">Amsterdam</span>
            </span>
          </a>
        </h1>
        <span className="header-title">Basisregistratie wonen</span>
      </header>
      <div className="col-sm-6">
        <nav>
          <ul className="links">
            <li>
              <span>
                {isAuthenticated && 'Ingelogd als: '}
                <b>{userName}</b>
              </span>
            </li>
            {!isAuthenticated ? (
              <li>
                <button type="button" onClick={event => onLoginLogoutButtonClick(event, 'datapunt')}>
                  {'Inloggen'}
                </button>
              </li>
            ) : (
              ''
            )}
            {!isAuthenticated ? (
              <li>
                <button type="button" onClick={event => onLoginLogoutButtonClick(event, 'grip')}>
                  {'Inloggen ADW'}
                </button>
              </li>
            ) : (
              ''
            )}
            {isAuthenticated ? (
              <li>
                <button type="button" onClick={onLoginLogoutButtonClick}>
                  {'Uitloggen'}
                </button>
              </li>
            ) : (
              ''
            )}
          </ul>
        </nav>
      </div>
    </div>
  </div>
);

Header.propTypes = {
  isAuthenticated: PropTypes.bool,
  onLoginLogoutButtonClick: PropTypes.func,
  userName: PropTypes.string,
};

Header.defaultProps = {
  isAuthenticated: false,
  onLoginLogoutButtonClick: undefined,
  userName: '',
};

export default Header;
