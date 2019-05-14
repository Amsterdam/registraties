import React from 'react';
import PropTypes from 'prop-types';

import { OBJECTS } from 'containers/App/constants';

import Section from '../Section';

const Gebied = ({ data }) => <Section cfg={OBJECTS.GEBIED} data={data} />;

Gebied.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  ]),
};

Gebied.defaultProps = {
  data: null,
};

export default Gebied;
