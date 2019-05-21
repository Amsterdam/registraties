import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';

import { makeSelectGebiedData } from 'containers/withSelector/selectors';
import Section from 'components/Section';
import { OBJECTS } from 'containers/App/constants';

const GebiedContainer = ({ data, intl }) => {
  const name = intl.formatMessage(OBJECTS.GEBIED.NAME);
  const href = OBJECTS.GEBIED.STELSELPEDIA_LINK;

  return <Section data={data} name={name} href={href} />;
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
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectGebiedData(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  injectIntl,
  withConnect,
)(memo(GebiedContainer));
