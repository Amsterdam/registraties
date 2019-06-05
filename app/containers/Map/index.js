import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectCoordinates } from 'containers/Verblijfsobject/selectors';
import Map from 'components/Map';

const mapStateToProps = createStructuredSelector({
  coordinates: makeSelectCoordinates,
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Map);
