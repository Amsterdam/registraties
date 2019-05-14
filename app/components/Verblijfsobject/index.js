import React from 'react';
import PropTypes from 'prop-types';

import { OBJECTS } from 'containers/App/constants';

import Section from '../Section';

const Verblijfsobject = ({ data }) => <Section cfg={OBJECTS.VERBLIJFSOBJECT} data={data} />;

Verblijfsobject.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

Verblijfsobject.defaultProps = {
  data: null,
};

export default Verblijfsobject;
