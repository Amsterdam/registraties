import React from 'react';
import PropTypes from 'prop-types';

import { OBJECTS } from 'containers/App/constants';

import Section from '../Section';

const Pand = ({ data }) => <Section cfg={OBJECTS.PAND} data={data} />;

Pand.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

Pand.defaultProps = {
  data: null,
};

export default Pand;
