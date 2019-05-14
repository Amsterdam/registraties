import React from 'react';
import PropTypes from 'prop-types';

import { OBJECTS } from 'containers/App/constants';

import Section from '../Section';

const Vestiging = ({ data }) => <Section cfg={OBJECTS.VESTIGING} data={data} />;

Vestiging.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
  ]),
};

Vestiging.defaultProps = {
  data: null,
};

export default Vestiging;
