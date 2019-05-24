import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Progress from 'components/Progress';
import { makeSelectProgress } from 'containers/App/selectors';

const ProgressContainer = ({ progress: { current, max } }) => <Progress now={current / max} labelPosition="bottom" />;

ProgressContainer.propTypes = {
  progress: PropTypes.shape({
    current: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  progress: makeSelectProgress(),
});

const withConnect = connect(mapStateToProps);

export default withConnect(ProgressContainer);
