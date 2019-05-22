import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';

import { makeSelectPandData } from 'containers/withSelector/selectors';
import Section from 'components/Section';
import { OBJECTS } from 'containers/App/constants';

export const PandContainer = ({ data, intl }) => {
  const name = intl.formatMessage(OBJECTS.PAND.NAME);
  const href = OBJECTS.PAND.STELSELPEDIA_LINK;

  return <Section data={data} name={name} href={href} />;
};

PandContainer.defaultProps = {
  data: null,
};

PandContainer.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      formattedKey: PropTypes.oneOfType([
        PropTypes.shape({
          id: PropTypes.string.isRequired,
        }),
        PropTypes.string,
      ]).isRequired,
      formattedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      key: PropTypes.string.isRequired,
      value: PropTypes.any,
    }),
  ),
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectPandData(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  injectIntl,
  withConnect,
)(memo(PandContainer));
