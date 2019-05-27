import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';

import Section from 'components/Section';
import { OBJECTS, LOAD_DATA_FAILED } from 'containers/App/constants';
import { makeSelectStatus } from 'containers/App/selectors';
import { makeSelectGebiedData } from 'containers/Nummeraanduiding/selectors';

export const GebiedContainer = ({ data, intl, status }) => {
  const name = intl.formatMessage(OBJECTS.GEBIED.NAME);
  const href = OBJECTS.GEBIED.STELSELPEDIA_LINK;
  const render = data || status !== LOAD_DATA_FAILED ? <Section data={data} name={name} href={href} /> : null;

  return render;
};

GebiedContainer.defaultProps = {
  data: undefined,
};

GebiedContainer.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      formattedKey: PropTypes.string.isRequired,
      formattedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      key: PropTypes.string.isRequired,
      value: PropTypes.any,
    }),
  ),
  intl: intlShape.isRequired,
  status: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectGebiedData(),
  status: makeSelectStatus(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  injectIntl,
  withConnect,
)(memo(GebiedContainer));
