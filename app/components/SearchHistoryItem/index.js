import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SearchHistoryItem } from './styles';

const SearchHistory = ({ url, text }) => (
  <SearchHistoryItem>
    <NavLink to={url}>{text}</NavLink>
  </SearchHistoryItem>
);

SearchHistory.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default SearchHistory;
