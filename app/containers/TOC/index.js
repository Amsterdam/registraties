import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import { makeSelectTOC } from 'containers/withSelector/selectors';
import TOC from 'components/TOC';

const Intl = injectIntl(TOC);

const mapStateToProps = createStructuredSelector({
  sections: makeSelectTOC(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Intl);
