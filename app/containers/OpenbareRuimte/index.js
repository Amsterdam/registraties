import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectOpenbareRuimteData } from 'containers/withSelector/selectors';
import OpenbareRuimte from 'components/OpenbareRuimte';

const mapStateToProps = createStructuredSelector({
  data: makeSelectOpenbareRuimteData(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(OpenbareRuimte);
