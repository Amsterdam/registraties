import React from 'react';
import PropTypes from 'prop-types';

import { OBJECTS } from 'containers/App/constants';

import Section from '../Section';

const OpenbareRuimte = ({ data }) => <Section cfg={OBJECTS.OPENBARE_RUIMTE} data={data} />;

OpenbareRuimte.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

OpenbareRuimte.defaultProps = {
  data: null,
};

export default OpenbareRuimte;
