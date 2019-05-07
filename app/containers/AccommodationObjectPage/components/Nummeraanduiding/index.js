import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { OBJECTS } from 'containers/App/constants';
import { makeSelectNummeraanduidingData } from 'containers/withSelector/selectors';

import Section from '../Section';

class Nummeraanduiding extends Component {
  render() {
    const { data } = this.props;
    return data && <Section cfg={OBJECTS.NUMMERAANDUIDING} data={data} />;
  }
}

Nummeraanduiding.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

Nummeraanduiding.defaultProps = {
  data: null,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectNummeraanduidingData(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Nummeraanduiding);
