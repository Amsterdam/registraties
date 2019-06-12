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

import { makeSelectKadastraalSubjectNPData } from './selectors';
import saga from './saga';
import reducer from './reducer';

export const KadastraalSubjectNPContainerComponent = ({ data, intl, status }) => {
  const name = intl.formatMessage(OBJECTS.KADASTRAAL_SUBJECT_NP.NAME);
  const href = OBJECTS.KADASTRAAL_SUBJECT_NP.STELSELPEDIA_LINK;
  const render = !!data || status !== LOAD_DATA_FAILED ? <Section data={data} name={name} href={href} /> : null;

  return render;
};

KadastraalSubjectNPContainerComponent.defaultProps = {
  data: null,
};

KadastraalSubjectNPContainerComponent.propTypes = {
  data: PropTypes.arrayOf(dataPropType),
  intl: intlShape.isRequired,
  status: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectKadastraalSubjectNPData,
  status: makeSelectStatus,
});

const withConnect = connect(mapStateToProps);
const Intl = injectIntl(KadastraalSubjectNPContainerComponent);

export default compose(
  withConnect,
  injectSaga({ key: 'kadastraalSubjectNP', saga }),
  injectReducer({ key: 'kadastraalSubjectNP', reducer }),
)(Intl);
