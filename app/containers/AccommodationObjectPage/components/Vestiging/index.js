import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { OBJECTS } from 'containers/App/constants';
import { makeSelectVestigingData } from 'containers/withSelector/selectors';

import Section from '../Section';

class Vestiging extends Component {
  render() {
    const { data } = this.props;
    return data && <Section cfg={OBJECTS.VESTIGING} data={data} />;
  }
}

Vestiging.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  ]),
};

Vestiging.defaultProps = {
  data: null,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectVestigingData(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Vestiging);
