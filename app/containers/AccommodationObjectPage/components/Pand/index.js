import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { OBJECTS } from 'containers/App/constants';
import { makeSelectPandData } from 'containers/withSelector/selectors';

import Section from '../Section';

class Pand extends Component {
  render() {
    const { data } = this.props;
    return data && <Section cfg={OBJECTS.PAND} data={data} />;
  }
}

Pand.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

Pand.defaultProps = {
  data: null,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectPandData(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Pand);
