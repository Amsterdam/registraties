import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectNummeraanduidingData } from 'containers/withSelector/selectors';
import Nummeraanduiding from 'components/Nummeraanduiding';

const mapStateToProps = createStructuredSelector({
  data: makeSelectNummeraanduidingData(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Nummeraanduiding);
