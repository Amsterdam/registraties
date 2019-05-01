import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const DownloadLink = ({ name, label, onClick, disabled, ...rest }) => (
  <a
    href="data:text/plain;charset=utf-8,"
    className="action primary"
    download={name}
    onClick={onClick}
    tabIndex={disabled ? -1 : 0}
    disabled={disabled}
    {...rest}
  >
    {label}
  </a>
);

DownloadLink.defaultProps = {
  disabled: false,
  label: 'CSV',
  onClick: null,
};

DownloadLink.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default DownloadLink;
