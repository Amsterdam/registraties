import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { OBJECTS } from 'containers/App/constants';
import { makeSelectGebiedData } from 'containers/withSelector/selectors';

import Section from '../Section';

class Gebied extends Component {
  render() {
    const { data, onSuccess } = this.props;
    return (
      <Fragment>
        {data && <span ref={onSuccess} />}
        <Section cfg={OBJECTS.GEBIED} data={data} />
      </Fragment>
    );
  }
}

Gebied.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  ]),
  onSuccess: PropTypes.func.isRequired,
};

Gebied.defaultProps = {
  data: null,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectGebiedData(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Gebied);
