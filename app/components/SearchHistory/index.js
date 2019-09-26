import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';

import SearchHistoryItem from 'components/SearchHistoryItem';
import { SearchHistoryList, SearchHistoryLabel, SearchHistoryWrapper } from './styles';
import messages from './messages';

const SearchHistory = ({ searchHistory, intl }) =>
  searchHistory.length > 0 && (
    <SearchHistoryWrapper>
      <SearchHistoryLabel>{intl.formatMessage(messages.search_history_header)}:</SearchHistoryLabel>
      <SearchHistoryList>
        {searchHistory.map(item => (
          <SearchHistoryItem key={item.id} url={item.url} text={item.text} />
        ))}
      </SearchHistoryList>
    </SearchHistoryWrapper>
  );

SearchHistory.defaultProps = {
  searchHistory: [],
};

SearchHistory.propTypes = {
  searchHistory: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ),
  intl: intlShape.isRequired,
};

export default SearchHistory;
