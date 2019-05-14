import React from 'react';
import PropTypes from 'prop-types';

import { OBJECTS } from 'containers/App/constants';

import Section from '../Section';

const KadastraalSubjectNP = ({ data }) => <Section cfg={OBJECTS.KADASTRAAL_SUBJECT_NP} data={data} />;

KadastraalSubjectNP.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  ]),
};

export default KadastraalSubjectNP;
