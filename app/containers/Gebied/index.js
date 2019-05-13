import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectGebiedData } from 'containers/withSelector/selectors';
import Gebied from 'components/Gebied';

const mapStateToProps = createStructuredSelector({
  data: makeSelectGebiedData(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Gebied);
