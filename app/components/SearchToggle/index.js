import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SearchIcon from '@datapunt/asc-assets/lib/Icons/Search.svg';
import CloseIcon from '@datapunt/asc-assets/lib/Icons/Close.svg';

const StyledIcon = styled.button`
  padding: 10px;
  z-index: 1;
  width: 50px;
  height: 50px;
  border: 0;
  background: none;

  &:hover {
    background-color: #ec0000;
    cursor: pointer;

    svg {
      fill: white;
    }
  }

  &:focus {
    outline: 4px solid #fec813;
  }
`;

const SearchToggle = ({ active, onClick, className, label, ...rest }) => (
  <StyledIcon size={20} padding={0} className={className} onClick={onClick} type="button" {...rest}>
    {active ? (
      <CloseIcon data-testid="searchToggle-close-icon" focusable="false" width={20} />
    ) : (
      <SearchIcon data-testid="searchToggle-search-icon" focusable="false" width={20} />
    )}
    <span className="visuallyhidden" data-testid="searchToggle-label">
      {label}
    </span>
  </StyledIcon>
);

SearchToggle.defaultProps = {
  active: false,
  className: '',
  onClick: null,
};

SearchToggle.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default SearchToggle;
