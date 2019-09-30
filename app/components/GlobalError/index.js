import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Close, Alert } from '@datapunt/asc-assets';

const ErrorWrapper = styled.div`
  background-color: #ec0000;
  color: white;
`;

const ErrorContainer = styled.div`
  max-width: 1024px;
  padding: 11px 16px;
  margin: 0 auto;
  display: flex;
`;

const P = styled.p`
  margin: 0;
  max-width: calc(100% - 35px);
  flex: 1;
`;

const Button = styled.button`
  height: 25px;
  width: 25px;
  margin-left: 10px;
  padding: 0;
  border: 0;
  appearance: none;
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

const GlobalError = ({ onClose, errorMessageLabel, closeLabel, feedbackLabel, showReportDialog }) => (
  <ErrorWrapper className="no-print cf">
    <ErrorContainer>
      <P>{errorMessageLabel}</P>
      {showReportDialog && (
        <Button type="button" onClick={showReportDialog} data-testid="globalerror-showReportDialog">
          <Alert width={20} fill="#fff" />
          <Label>{feedbackLabel}</Label>
        </Button>
      )}
      <Button type="button" onClick={onClose}>
        <Close width={20} fill="#fff" />
        <Label>{closeLabel}</Label>
      </Button>
    </ErrorContainer>
  </ErrorWrapper>
);

GlobalError.defaultProps = {
  onClose: null,
  showReportDialog: null,
};

GlobalError.propTypes = {
  errorMessageLabel: PropTypes.string.isRequired,
  closeLabel: PropTypes.string.isRequired,
  feedbackLabel: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  showReportDialog: PropTypes.func,
};

export default GlobalError;
