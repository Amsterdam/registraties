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
import maReducer from 'containers/MaatschappelijkeActiviteit/reducer';
import maSaga from 'containers/MaatschappelijkeActiviteit/saga';

import { makeSelectVestigingData } from './selectors';
import saga from './saga';
import reducer from './reducer';

export const VestigingContainer = ({ data, intl, status }) => {
  const name = intl.formatMessage(OBJECTS.VESTIGING.NAME);
  const href = OBJECTS.VESTIGING.STELSELPEDIA_LINK;

  const render = data || status !== LOAD_DATA_FAILED ? <Section data={data} name={name} href={href} /> : null;

  return render;
};

VestigingContainer.defaultProps = {
  data: null,
};

VestigingContainer.propTypes = {
  data: PropTypes.oneOfType([dataPropType, PropTypes.arrayOf(dataPropType)]),
  intl: intlShape.isRequired,
  status: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectVestigingData(),
  status: makeSelectStatus(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  injectIntl,
  withConnect,
  injectSaga({ key: 'vestiging', saga }),
  injectReducer({ key: 'vestiging', reducer }),
  injectSaga({ key: 'maatschappelijkeActiviteit', saga: maSaga }),
  injectReducer({ key: 'maatschappelijkeActiviteit', reducer: maReducer }),
)(memo(VestigingContainer));
