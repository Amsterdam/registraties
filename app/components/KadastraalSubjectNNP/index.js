import React from 'react';
import PropTypes from 'prop-types';

import { OBJECTS } from 'containers/App/constants';

import Section from '../Section';

const KadastraalSubjectNNP = ({ data }) => <Section cfg={OBJECTS.KADASTRAAL_SUBJECT_NNP} data={data} />;

KadastraalSubjectNNP.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  ]),
};

KadastraalSubjectNNP.defaultProps = {
  data: null,
};

export default KadastraalSubjectNNP;
