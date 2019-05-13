import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectWoonplaatsData } from 'containers/withSelector/selectors';
import Woonplaats from 'components/Woonplaats';

const mapStateToProps = createStructuredSelector({
  data: makeSelectWoonplaatsData(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Woonplaats);
