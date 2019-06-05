import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';

import { dataPropType } from 'utils/propTypes';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Section from 'components/Section';
import { OBJECTS, LOAD_DATA_FAILED } from 'containers/App/constants';
import { makeSelectStatus } from 'containers/App/selectors';

import { makeSelectKadastraalObjectData } from './selectors';
import saga from './saga';
import reducer from './reducer';

export const KadastraalObjectContainer = ({ data, intl, status }) => {
  const name = intl.formatMessage(OBJECTS.KADASTRAAL_OBJECT.NAME);
  const href = OBJECTS.KADASTRAAL_OBJECT.STELSELPEDIA_LINK;
  const render = data || status !== LOAD_DATA_FAILED ? <Section data={data} name={name} href={href} /> : null;

  return render;
};

KadastraalObjectContainer.propTypes = {
  data: PropTypes.oneOfType([dataPropType, PropTypes.arrayOf(dataPropType)]),
  intl: intlShape.isRequired,
  status: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectKadastraalObjectData,
  status: makeSelectStatus,
});

const withConnect = connect(mapStateToProps);

export default compose(
  injectIntl,
  withConnect,
  injectSaga({ key: 'kadastraalObject', saga }),
  injectReducer({ key: 'kadastraalObject', reducer }),
)(memo(KadastraalObjectContainer));
