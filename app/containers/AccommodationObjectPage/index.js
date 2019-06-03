import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import injectSaga from 'utils/injectSaga';
import { makeSelectStatus } from 'containers/App/selectors';
import { makeSelectSummary } from 'containers/Summary/selectors';
import { loadBAGData } from 'containers/App/actions';
import AccObjPageComponent from 'components/AccommodationObject';
import saga from './saga';

export const AccommodationObjectPageComponent = injectIntl(AccObjPageComponent);

const mapStateToProps = createStructuredSelector({
  summary: makeSelectSummary(),
  status: makeSelectStatus(),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadBAGData,
    },
    dispatch,
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withInjectSaga = injectSaga({ key: 'accObjPage', saga });

export default compose(
  withInjectSaga,
  withConnect,
)(AccommodationObjectPageComponent);
