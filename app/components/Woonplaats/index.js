import React from 'react';
import PropTypes from 'prop-types';

import { OBJECTS } from 'containers/App/constants';

import Section from '../Section';

const Woonplaats = ({ data, onSuccess }) => (
  <>
    {data && <span ref={onSuccess} />}
    <Section cfg={OBJECTS.WOONPLAATS} data={data} />
  </>
);

Woonplaats.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  onSuccess: PropTypes.func.isRequired,
};

Woonplaats.defaultProps = {
  data: null,
};

export default Woonplaats;
