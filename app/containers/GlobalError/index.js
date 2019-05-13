import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';

import { Icon } from '@datapunt/asc-ui';
import close from '@datapunt/asc-assets/lib/Icons/Close.svg';

import { makeSelectError, makeSelectErrorMessage } from 'containers/App/selectors';
import appMessages from 'containers/App/messages';
import { resetGlobalError } from '../App/actions';

import errorMessages from './messages';
import './style.scss';

const StyledIcon = styled(Icon)`
  filter: invert(1);
`;

export const GlobalError = ({ error, errorMessage, intl, onClose }) => (
  <Fragment>
    {error ? (
      <div className="global-error cf">
        <p>{intl.formatMessage(errorMessages[errorMessage])}</p>
        <button type="button" className="global-error__close-button" onClick={onClose}>
          <StyledIcon iconUrl={`url('${close}');`} size={14} padding={0} inline />
          <span className="label">{intl.formatMessage(appMessages.close)}</span>
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
