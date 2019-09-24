import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SearchHistory from 'components/SearchHistory';
import { makeSelectSearchHistory } from './selectors';

const mapStateToProps = createStructuredSelector({
  searchHistory: makeSelectSearchHistory,
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(SearchHistory);
