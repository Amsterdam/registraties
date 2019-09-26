import React from 'react';
import PropTypes from 'prop-types';

import SearchHistoryItem from 'components/SearchHistoryItem';
import { SearchHistoryList, SearchHistoryLabel, SearchHistoryWrapper } from './styles';

const SearchHistory = ({ searchHistory }) =>
  searchHistory.length > 0 && (
    <SearchHistoryWrapper>
      <SearchHistoryLabel>Onlangs gezocht op:</SearchHistoryLabel>
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
};

export default SearchHistory;
