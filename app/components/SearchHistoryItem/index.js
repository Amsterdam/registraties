import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SearchHistoryItemWrapper } from './styles';

const SearchHistoryItem = ({ url, text }) => (
  <SearchHistoryItemWrapper>
    <NavLink to={url}>{text}</NavLink>
  </SearchHistoryItemWrapper>
);

SearchHistoryItem.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default SearchHistoryItem;
