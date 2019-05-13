import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectKadastraalSubjectNPData } from 'containers/withSelector/selectors';
import KadastraalSubjectNP from 'components/KadastraalSubjectNP';

const mapStateToProps = createStructuredSelector({
  data: makeSelectKadastraalSubjectNPData(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(KadastraalSubjectNP);
