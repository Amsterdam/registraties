import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { OBJECTS } from 'containers/App/constants';
import { makeSelectVerblijfsobjectData } from 'containers/withSelector/selectors';

import Section from '../Section';

class Verblijfsobject extends Component {
  render() {
    const { data } = this.props;
    return data && <Section cfg={OBJECTS.VERBLIJFSOBJECT} data={data} />;
  }
}

Verblijfsobject.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

Verblijfsobject.defaultProps = {
  data: null,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectVerblijfsobjectData(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Verblijfsobject);
