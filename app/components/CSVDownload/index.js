import React from 'react';
import PropTypes from 'prop-types';

const CSVDownload = ({ name, onClick, ...rest }) => (
  <a className="action" href="data:text/plain;charset=utf-8," download={name} onClick={onClick} {...rest}>
    CSV
  </a>
);

CSVDownload.defaultProps = {
  onClick: null,
};

CSVDownload.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default CSVDownload;
