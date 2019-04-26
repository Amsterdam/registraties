import React from 'react';
import PropTypes from 'prop-types';

const CSVDownload = ({ data, onClick }) => (
  <a className="action" href={`data:text/plain;charset=utf-8,${data}`} download="export.csv" onClick={onClick}>
    CSV
  </a>
);

CSVDownload.propTypes = {
  data: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default CSVDownload;
