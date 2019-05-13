import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import { makeSelectSummary } from 'containers/withSelector/selectors';
import Summary from 'components/Summary';

const mapStateToProps = createStructuredSelector({
  data: makeSelectSummary(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  injectIntl,
  withConnect,
)(Summary);
