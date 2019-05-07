import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { OBJECTS } from 'containers/App/constants';
import { makeSelectKadastraalSubjectNNPData } from 'containers/withSelector/selectors';

import Section from '../Section';

class KadastraalSubjectNNP extends Component {
  render() {
    const { data } = this.props;
    return data && <Section cfg={OBJECTS.KADASTRAAL_SUBJECT_NNP} data={data} />;
  }
}

KadastraalSubjectNNP.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  ]),
};

KadastraalSubjectNNP.defaultProps = {
  data: null,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectKadastraalSubjectNNPData(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(KadastraalSubjectNNP);
