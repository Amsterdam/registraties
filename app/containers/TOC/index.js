import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import injectReducer from 'utils/injectReducer';
import TOC from 'components/TOC';

import { makeSelectTOC } from './selectors';
import reducer from './reducer';

const mapStateToProps = createStructuredSelector({
  sections: makeSelectTOC,
});

const withConnect = connect(mapStateToProps);
const Intl = injectIntl(TOC);

export default compose(
  withConnect,
  injectReducer({ key: 'toc', reducer }),
)(Intl);
