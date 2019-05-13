import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectKadastraalSubjectNNPData } from 'containers/withSelector/selectors';
import KadastraalSubjectNNP from 'components/KadastraalSubjectNNP';

const mapStateToProps = createStructuredSelector({
  data: makeSelectKadastraalSubjectNNPData(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(KadastraalSubjectNNP);
