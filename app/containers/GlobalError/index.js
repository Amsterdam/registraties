import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';
import * as Sentry from '@sentry/browser';

import { makeSelectError, makeSelectErrorMessage, makeSelectErrorEventId } from 'containers/App/selectors';
import appMessages from 'containers/App/messages';
import { resetGlobalError } from 'containers/App/actions';

import GlobalError from 'components/GlobalError';

import errorMessages from './messages';

export const showReportDialog = (eventId, intl) => () => {
  Sentry.showReportDialog({
    eventId,
    title: intl.formatMessage(errorMessages.error_reporting_title),
    subtitle: intl.formatMessage(errorMessages.error_reporting_subtitle),
    subtitle2: '',
    labelName: intl.formatMessage(errorMessages.error_reporting_label_name),
    labelEmail: intl.formatMessage(errorMessages.error_reporting_label_email),
    labelComments: intl.formatMessage(errorMessages.error_reporting_label_comments),
    labelClose: intl.formatMessage(errorMessages.error_reporting_label_close),
    labelSubmit: intl.formatMessage(errorMessages.error_reporting_label_submit),
    errorGeneric: intl.formatMessage(errorMessages.error_reporting_error_generic),
    errorFormEntry: intl.formatMessage(errorMessages.error_reporting_error_form),
    successMessage: intl.formatMessage(errorMessages.error_reporting_success_message),
  });
};

export const GlobalErrorContainer = ({ error, errorMessage, errorEventId, intl, onClose }) => {
  if (!error) {
    return null;
  }

  const props = {
    errorMessageLabel: intl.formatMessage(errorMessages[errorMessage]),
    closeLabel: intl.formatMessage(appMessages.close),
    feedbackLabel: intl.formatMessage(appMessages.report_feedback),
    onClose,
    showReportDialog: errorEventId ? showReportDialog(errorEventId, intl) : null,
  };

  return <GlobalError {...props} />;
};

GlobalErrorContainer.defaultProps = {
  error: false,
  errorEventId: undefined,
  errorMessage: '',
  onClose: null,
};

GlobalErrorContainer.propTypes = {
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  intl: intlShape.isRequired,
  onClose: PropTypes.func,
  errorEventId: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError,
  errorMessage: makeSelectErrorMessage,
  errorEventId: makeSelectErrorEventId,
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

const composed = compose(
  injectIntl,
  withConnect,
)(GlobalErrorContainer);

export { composed as default, GlobalError as GlobalErrorComponent };
