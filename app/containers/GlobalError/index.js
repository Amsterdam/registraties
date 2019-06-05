import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import * as Sentry from '@sentry/browser';

import CloseIcon from '@datapunt/asc-assets/lib/Icons/Close.svg';
import AlertIcon from '@datapunt/asc-assets/lib/Icons/Alert.svg';

import { makeSelectError, makeSelectErrorMessage, makeSelectErrorEventId } from 'containers/App/selectors';
import appMessages from 'containers/App/messages';
import { resetGlobalError } from 'containers/App/actions';

import errorMessages from './messages';

const ErrorWrapper = styled.div`
  background-color: #ec0000;
  color: white;
`;

const ErrorContainer = styled.div`
  max-width: 1024px;
  padding: 11px 16px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const P = styled.p`
  margin: 0;
  max-width: calc(100% - 60px);
  flex: 1;
`;

const Button = styled.button`
  height: 25px;
  margin-left: 10px;
  width: 25px;
  -webkit-appearance: none;
  appearance: none;
  border: 0;
  float: right;
  background: transparent;
  cursor: pointer;
`;

const Label = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

export const GlobalError = ({ error, errorMessage, intl, onClose, errorEventId }) => {
  const showReportDialog = () => {
    Sentry.showReportDialog({
      eventId: errorEventId,
      title: intl.formatMessage(errorMessages.error_reporting_title),
      subtitle: intl.formatMessage(errorMessages.error_reporting_subtitle),
      subtitle2: intl.formatMessage(errorMessages.error_reporting_subtitle2),
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

  return (
    error && (
      <ErrorWrapper className="no-print cf">
        <ErrorContainer>
          <P>{intl.formatMessage(errorMessages[errorMessage])}</P>
          {errorEventId && (
            <Button type="button" onClick={showReportDialog} title="Report feedback">
              <AlertIcon focusable="false" width={20} fill="#fff" />
              <Label>Report feedback</Label>
            </Button>
          )}
          <Button type="button" onClick={onClose}>
            <CloseIcon focusable="false" width={20} fill="#fff" />
            <Label>{intl.formatMessage(appMessages.close)}</Label>
          </Button>
        </ErrorContainer>
      </ErrorWrapper>
    )
  );
};

GlobalError.defaultProps = {
  error: false,
  errorEventId: undefined,
};

GlobalError.propTypes = {
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  intl: intlShape.isRequired,
  onClose: PropTypes.func,
  errorEventId: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  errorMessage: makeSelectErrorMessage(),
  errorEventId: makeSelectErrorEventId(),
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
