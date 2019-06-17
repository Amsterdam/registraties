import React from 'react';
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

import { makeSelectWoonplaatsData } from './selectors';
import saga from './saga';
import reducer from './reducer';

export const WoonplaatsContainerComponent = ({ data, intl, status }) => {
  const name = intl.formatMessage(OBJECTS.WOONPLAATS.NAME);
  const href = OBJECTS.WOONPLAATS.STELSELPEDIA_LINK;
  const render = !!data || status !== LOAD_DATA_FAILED ? <Section data={data} name={name} href={href} /> : null;

  return render;
};

WoonplaatsContainerComponent.defaultProps = {
  data: undefined,
};

WoonplaatsContainerComponent.propTypes = {
  data: dataPropType,
  intl: intlShape.isRequired,
  status: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectWoonplaatsData,
  status: makeSelectStatus,
});

const withConnect = connect(mapStateToProps);
const Intl = injectIntl(WoonplaatsContainerComponent);

export default compose(
  withConnect,
  injectSaga({ key: 'woonplaats', saga }),
  injectReducer({ key: 'woonplaats', reducer }),
)(Intl);
