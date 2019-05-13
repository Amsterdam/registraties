import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectVestigingData } from 'containers/withSelector/selectors';
import Vestiging from 'components/Vestiging';

const mapStateToProps = createStructuredSelector({
  data: makeSelectVestigingData(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Vestiging);
