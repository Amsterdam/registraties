import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { OBJECTS } from 'containers/App/constants';
import { makeSelectKadastraalObjectData } from 'containers/withSelector/selectors';

import Section from '../Section';

class KadastraalObject extends Component {
  render() {
    const { data, onLoad } = this.props;
    return data && <Section cfg={OBJECTS.KADASTRAAL_OBJECT} data={data} ref={onLoad} />;
  }
}

KadastraalObject.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  onLoad: PropTypes.func.isRequired,
};

KadastraalObject.defaultProps = {
  data: null,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectKadastraalObjectData(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(KadastraalObject);
