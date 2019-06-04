import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';

import CloseIcon from '@datapunt/asc-assets/lib/Icons/Close.svg';

import { makeSelectError, makeSelectErrorMessage } from 'containers/App/selectors';
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
  float: left;
  max-width: calc(100% - 30px);
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

export const GlobalError = ({ error, errorMessage, intl, onClose }) => (
  <Fragment>
    {error ? (
      <ErrorWrapper className="no-print cf">
        <ErrorContainer>
          <P>{intl.formatMessage(errorMessages[errorMessage])}</P>
          <Button type="button" onClick={onClose}>
            <CloseIcon focusable="false" width={14} fill="#fff" />
            <Label>{intl.formatMessage(appMessages.close)}</Label>
          </Button>
        </ErrorContainer>
      </ErrorWrapper>
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
  error: makeSelectError,
  errorMessage: makeSelectErrorMessage,
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
