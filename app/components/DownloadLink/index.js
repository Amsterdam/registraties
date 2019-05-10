import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@datapunt/asc-ui';

import './style.scss';

const DownloadLink = ({ name, label, onClick, disabled, ...rest }) => (
  <Button
    as="a"
    href={null}
    // className="action secondary"
    download={name}
    onClick={onClick}
    tabIndex={disabled ? -1 : 0}
    disabled={disabled}
    size="small"
    {...rest}
  >
    {label}
  </Button>
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
