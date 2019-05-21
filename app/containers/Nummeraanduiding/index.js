import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';

import { makeSelectNummeraanduidingData } from 'containers/withSelector/selectors';
import Section from 'components/Section';
import { OBJECTS } from 'containers/App/constants';

const NummeraanduidingContainer = ({ data, intl }) => {
  const name = intl.formatMessage(OBJECTS.NUMMERAANDUIDING.NAME);
  const href = OBJECTS.NUMMERAANDUIDING.STELSELPEDIA_LINK;

  return <Section data={data} name={name} href={href} />;
};

NummeraanduidingContainer.defaultProps = {
  data: undefined,
};

NummeraanduidingContainer.propTypes = {
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
  data: makeSelectNummeraanduidingData(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  injectIntl,
  withConnect,
)(memo(NummeraanduidingContainer));
