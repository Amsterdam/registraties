import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@datapunt/asc-ui';

const DownloadLink = ({ name, label, onClick, disabled, ...rest }) => (
  <Link
    href={null}
    download={name}
    onClick={onClick}
    tabIndex={disabled ? -1 : 0}
    disabled={disabled}
    size="small"
    {...rest}
  >
    {label}
  </Link>
);

DownloadLink.defaultProps = {
  disabled: null,
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
