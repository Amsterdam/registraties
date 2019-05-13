import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectKadastraalObjectData } from 'containers/withSelector/selectors';
import KadastraalObject from 'components/KadastraalObject';

const mapStateToProps = createStructuredSelector({
  data: makeSelectKadastraalObjectData(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(KadastraalObject);
