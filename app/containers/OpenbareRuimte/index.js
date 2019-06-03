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

import { makeSelectOpenbareRuimteData } from './selectors';
import saga from './saga';
import reducer from './reducer';

export const OpenbareRuimteContainer = ({ data, intl, status }) => {
  const name = intl.formatMessage(OBJECTS.OPENBARE_RUIMTE.NAME);
  const href = OBJECTS.OPENBARE_RUIMTE.STELSELPEDIA_LINK;
  const render = data || status !== LOAD_DATA_FAILED ? <Section data={data} name={name} href={href} /> : null;

  return render;
};

OpenbareRuimteContainer.defaultProps = {
  data: undefined,
};

OpenbareRuimteContainer.propTypes = {
  data: dataPropType,
  intl: intlShape.isRequired,
  status: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectOpenbareRuimteData(),
  status: makeSelectStatus(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  injectIntl,
  withConnect,
  injectSaga({ key: 'openbareRuimte', saga }),
  injectReducer({ key: 'openbareRuimte', reducer }),
)(memo(OpenbareRuimteContainer));
