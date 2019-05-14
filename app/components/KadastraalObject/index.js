import React from 'react';
import PropTypes from 'prop-types';

import { OBJECTS } from 'containers/App/constants';

import Section from '../Section';

const KadastraalObject = ({ data }) => <Section cfg={OBJECTS.KADASTRAAL_OBJECT} data={data} />;

KadastraalObject.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  ]),
};

KadastraalObject.defaultProps = {
  data: null,
};

export default KadastraalObject;
