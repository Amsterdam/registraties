import React from 'react';
import PropTypes from 'prop-types';

import { OBJECTS } from 'containers/App/constants';

import Section from '../Section';

const OpenbareRuimte = ({ data, onSuccess }) => (
  <>
    {data && <span ref={onSuccess} />}
    <Section cfg={OBJECTS.OPENBARE_RUIMTE} data={data} />
  </>
);

OpenbareRuimte.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  onSuccess: PropTypes.func.isRequired,
};

OpenbareRuimte.defaultProps = {
  data: null,
};

export default OpenbareRuimte;
