import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Progress from 'components/Progress';
import { makeSelectProgress } from 'containers/App/selectors';

const ProgressContainer = ({ progress }) => <Progress now={progress} labelPosition="bottom" />;

ProgressContainer.propTypes = {
  progress: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  progress: makeSelectProgress(),
});

const withConnect = connect(mapStateToProps);

export default withConnect(ProgressContainer);
