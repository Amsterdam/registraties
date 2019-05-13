import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectPandData } from 'containers/withSelector/selectors';
import Pand from 'components/Pand';

const mapStateToProps = createStructuredSelector({
  data: makeSelectPandData(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Pand);
