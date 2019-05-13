import React from 'react';
import PropTypes from 'prop-types';

import { OBJECTS } from 'containers/App/constants';

import Section from '../Section';

const KadastraalSubjectNNP = ({ data, onSuccess }) => (
  <>
    {data && <span ref={onSuccess} />}
    <Section cfg={OBJECTS.KADASTRAAL_SUBJECT_NNP} data={data} />
  </>
);

KadastraalSubjectNNP.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  ]),
  onSuccess: PropTypes.func.isRequired,
};

KadastraalSubjectNNP.defaultProps = {
  data: null,
};

export default KadastraalSubjectNNP;
