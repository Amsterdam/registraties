import React from 'react';
import PropTypes from 'prop-types';

const DownloadLink = ({ name, label, onClick, ...rest }) => (
  <a className="action" href="data:text/plain;charset=utf-8," download={name} onClick={onClick} {...rest}>
    {label}
  </a>
);

DownloadLink.defaultProps = {
  label: 'CSV',
  onClick: null,
};

DownloadLink.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default DownloadLink;
