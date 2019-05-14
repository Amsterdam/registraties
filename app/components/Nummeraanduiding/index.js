import React from 'react';
import PropTypes from 'prop-types';

import { OBJECTS } from 'containers/App/constants';

import Section from '../Section';

const Nummeraanduiding = ({ data }) => <Section cfg={OBJECTS.NUMMERAANDUIDING} data={data} />;

Nummeraanduiding.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

Nummeraanduiding.defaultProps = {
  data: null,
};

export default Nummeraanduiding;
