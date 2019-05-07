import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { OBJECTS } from 'containers/App/constants';
import { makeSelectKadastraalSubjectNPData } from 'containers/withSelector/selectors';

import Section from '../Section';

class KadastraalSubjectNP extends Component {
  render() {
    const { data } = this.props;
    return data && <Section cfg={OBJECTS.KADASTRAAL_SUBJECT_NP} data={data} />;
  }
}

KadastraalSubjectNP.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  ]),
};

KadastraalSubjectNP.defaultProps = {
  data: null,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectKadastraalSubjectNPData(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(KadastraalSubjectNP);
