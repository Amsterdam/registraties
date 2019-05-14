import React from 'react';
import PropTypes from 'prop-types';

import { OBJECTS } from 'containers/App/constants';

import Section from '../Section';

const Woonplaats = ({ data }) => <Section cfg={OBJECTS.WOONPLAATS} data={data} />;

Woonplaats.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

Woonplaats.defaultProps = {
  data: null,
};

export default Woonplaats;
