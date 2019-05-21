import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Progress from 'components/Progress';
import saga from 'containers/App/saga';
import reducer from 'containers/App/reducer';
import { makeSelectProgress } from 'containers/App/selectors';

// eslint-disable-next-line
class ProgressContainer extends Component {
  render() {
    const { progress } = this.props;

    return <Progress now={progress} labelPosition="bottom" />;
  }
}

ProgressContainer.propTypes = {
  progress: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  progress: makeSelectProgress(),
});

const withConnect = connect(mapStateToProps);
const withReducer = injectReducer({ key: 'search', reducer });
const withSaga = injectSaga({ key: 'search', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProgressContainer);
