import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';
import { makeSelectError, makeSelectErrorMessage } from 'containers/App/selectors';
import appMessages from 'containers/App/messages';
import { resetGlobalError } from '../App/actions';

import errorMessages from './messages';
import './style.scss';

export const GlobalError = ({ error, errorMessage, intl, onClose }) => (
  <Fragment>
    {error ? (
      <div className="global-error">
        <p>{intl.formatMessage(errorMessages[errorMessage])}</p>
        <button type="button" className="global-error__close-button" onClick={onClose}>
          <span>{intl.formatMessage(appMessages.close)}</span>
        </button>
      </div>
    ) : (
      ''
    )}
  </Fragment>
);

GlobalError.defaultProps = {
  error: false,
};

GlobalError.propTypes = {
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  intl: intlShape.isRequired,
  onClose: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  errorMessage: makeSelectErrorMessage(),
});

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onClose: resetGlobalError,
    },
    dispatch,
  );
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectIntl,
  withConnect,
)(GlobalError);
