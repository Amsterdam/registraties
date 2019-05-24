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
import ligplaatsSaga from 'containers/Ligplaats/saga';
import ligplaatsReducer from 'containers/Ligplaats/reducer';

import { makeSelectVerblijfsobjectData } from './selectors';
import saga from './saga';
import reducer from './reducer';

export const VerblijfsObjectContainer = ({ data, intl }) => {
  const name = intl.formatMessage(OBJECTS.VERBLIJFSOBJECT.NAME);
  const href = OBJECTS.VERBLIJFSOBJECT.STELSELPEDIA_LINK;

  return <Section data={data} name={name} href={href} />;
};

VerblijfsObjectContainer.defaultProps = {
  data: null,
};

VerblijfsObjectContainer.propTypes = {
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
  data: makeSelectVerblijfsobjectData(),
});

const withConnect = connect(mapStateToProps);

const Intl = injectIntl(VerblijfsObjectContainer);

export default compose(
  injectIntl,
  withConnect,
  injectSaga({ key: 'verblijfsobject', saga }),
  injectReducer({ key: 'verblijfsobject', reducer }),
  injectSaga({ key: 'ligplaats', saga: ligplaatsSaga }),
  injectReducer({ key: 'ligplaats', reducer: ligplaatsReducer }),
)(memo(Intl));
