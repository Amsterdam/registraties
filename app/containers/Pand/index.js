import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';

import { dataPropType } from 'utils/propTypes';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Section from 'components/Section/Loadable';
import { OBJECTS, LOAD_DATA_FAILED } from 'containers/App/constants';
import { makeSelectStatus } from 'containers/App/selectors';

import { makeSelectPandData } from './selectors';
import saga from './saga';
import reducer from './reducer';

export const PandContainer = ({ data, intl, status }) => {
  const name = intl.formatMessage(OBJECTS.PAND.NAME);
  const href = OBJECTS.PAND.STELSELPEDIA_LINK;
  const render = data || status !== LOAD_DATA_FAILED ? <Section data={data} name={name} href={href} /> : null;

  return render;
};

PandContainer.defaultProps = {
  data: null,
};

PandContainer.propTypes = {
  data: dataPropType,
  intl: intlShape.isRequired,
  status: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectPandData,
  status: makeSelectStatus,
});

const withConnect = connect(mapStateToProps);

export default compose(
  injectIntl,
  withConnect,
  injectSaga({ key: 'pand', saga }),
  injectReducer({ key: 'pand', reducer }),
)(memo(PandContainer));
