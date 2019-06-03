import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Ul = styled.ul`
  &,
  ul {
    padding: 0;
  }

  list-style: none;
  padding-bottom: 30px;

  &:not(:first-child) {
    border-bottom: 4px solid #767676;
  }

  & li:last-of-type ul {
    padding-bottom: 0;
  }

  *:last-of-type > *:last-of-type ul:last-of-type {
    border: 0;
  }

  li {
    padding-left: 23px;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      width: 8px;
      height: 8px;
      margin-top: 7px;
      background-color: #767676;
    }
  }

  li.is-nested {
    ul {
      padding-bottom: 1em;
    }

    padding-left: 0;

    &:before {
      content: none;
    }
  }
`;

const List = ({ children, ...rest }) => <Ul {...rest}>{children}</Ul>;

List.propTypes = {
  children: PropTypes.node.isRequired,
};

export default List;
