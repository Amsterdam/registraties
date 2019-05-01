import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import messages from 'containers/App/messages';

import './style.scss';

const DownloadLink = ({ name, label, onClick, disabled, intl, ...rest }) => (
  <a
    href="data:text/plain;charset=utf-8,"
    className="action primary"
    onClick={onClick}
    tabIndex={disabled ? -1 : 0}
    disabled={disabled}
    download={`${intl.formatMessage(messages.csv_file_name)}.csv`}
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
  intl: intlShape.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default injectIntl(DownloadLink);
