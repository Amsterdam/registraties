import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Section from 'components/Section';
import { OBJECTS } from 'containers/App/constants';

import { makeSelectKadastraalObjectData } from './selectors';
import saga from './saga';
import reducer from './reducer';

export const KadastraalObjectContainer = ({ data, intl }) => {
  const name = intl.formatMessage(OBJECTS.KADASTRAAL_OBJECT.NAME);
  const href = OBJECTS.KADASTRAAL_OBJECT.STELSELPEDIA_LINK;

  return <Section data={data} name={name} href={href} />;
};

KadastraalObjectContainer.defaultProps = {
  data: undefined,
};

KadastraalObjectContainer.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        formattedKey: PropTypes.string.isRequired,
        formattedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        key: PropTypes.string.isRequired,
        value: PropTypes.any,
      }),
    ),
  ),
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectKadastraalObjectData(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  injectIntl,
  withConnect,
  injectSaga({ key: 'kadastraalObject', saga }),
  injectReducer({ key: 'kadastraalObject', reducer }),
)(memo(KadastraalObjectContainer));
