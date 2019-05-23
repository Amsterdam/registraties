import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';

import { makeSelectOpenbareRuimteData } from 'containers/withSelector/selectors';
import Section from 'components/Section';
import { OBJECTS } from 'containers/App/constants';

export const OpenbareRuimteContainer = ({ data, intl }) => {
  const name = intl.formatMessage(OBJECTS.OPENBARE_RUIMTE.NAME);
  const href = OBJECTS.OPENBARE_RUIMTE.STELSELPEDIA_LINK;

  return <Section data={data} name={name} href={href} />;
};

OpenbareRuimteContainer.defaultProps = {
  data: undefined,
};

OpenbareRuimteContainer.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      formattedKey: PropTypes.string.isRequired,
      formattedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      key: PropTypes.string.isRequired,
      value: PropTypes.any,
    }),
  ),
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectOpenbareRuimteData(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  injectIntl,
  withConnect,
)(memo(OpenbareRuimteContainer));
