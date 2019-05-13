import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectVerblijfsobjectData } from 'containers/withSelector/selectors';
import Verblijfsobject from 'components/Verblijfsobject';

const mapStateToProps = createStructuredSelector({
  data: makeSelectVerblijfsobjectData(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Verblijfsobject);
