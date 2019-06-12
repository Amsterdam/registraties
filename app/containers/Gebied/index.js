import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';

import { dataPropType } from 'utils/propTypes';
import Section from 'components/Section';
import { OBJECTS, LOAD_DATA_FAILED } from 'containers/App/constants';
import { makeSelectStatus } from 'containers/App/selectors';
import { makeSelectGebiedData } from 'containers/Nummeraanduiding/selectors';

export const GebiedContainerComponent = ({ data, intl, status }) => {
  const name = intl.formatMessage(OBJECTS.GEBIED.NAME);
  const href = OBJECTS.GEBIED.STELSELPEDIA_LINK;
  const render = !!data || status !== LOAD_DATA_FAILED ? <Section data={data} name={name} href={href} /> : null;

  return render;
};

GebiedContainerComponent.defaultProps = {
  data: undefined,
};

GebiedContainerComponent.propTypes = {
  data: dataPropType,
  intl: intlShape.isRequired,
  status: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectGebiedData,
  status: makeSelectStatus,
});

const withConnect = connect(mapStateToProps);
const Intl = injectIntl(GebiedContainerComponent);

export default compose(withConnect)(Intl);
