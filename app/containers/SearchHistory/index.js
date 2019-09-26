import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import SearchHistory from 'components/SearchHistory';
import { makeSelectSearchHistory } from './selectors';

const mapStateToProps = createStructuredSelector({
  searchHistory: makeSelectSearchHistory,
});

const withConnect = connect(mapStateToProps);

export default injectIntl(compose(withConnect)(SearchHistory));
