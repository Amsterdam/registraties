import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import Summary from 'components/Summary';
import { makeSelectSummary } from './selectors';

const mapStateToProps = createStructuredSelector({
  data: makeSelectSummary,
});

const withConnect = connect(mapStateToProps);

export default compose(
  injectIntl,
  withConnect,
)(Summary);
