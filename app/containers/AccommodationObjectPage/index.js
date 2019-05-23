import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import withSelector from 'containers/withSelector';
import { loadBAGData } from 'containers/withSelector/actions';
import AccObjPageComponent from 'components/AccommodationObject';

const AccommodationObjectPageComponent = injectIntl(AccObjPageComponent);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadBAGData,
    },
    dispatch,
  );

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withSelector,
  withConnect,
)(AccommodationObjectPageComponent);
