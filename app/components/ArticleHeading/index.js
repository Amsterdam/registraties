import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const H2 = styled.h2`
  ${({ marginCollapse }) =>
    marginCollapse &&
    css`
      margin-top: 0;
    `}

  ${({ small }) =>
    small &&
    css`
      font-size: 20px;
    `}
`;

const ArticleHeading = ({ children, ...rest }) => <H2 {...rest}>{children}</H2>;

ArticleHeading.defaultProps = {
  marginCollapse: false,
  small: false,
};

ArticleHeading.propTypes = {
  children: PropTypes.node.isRequired,
  marginCollapse: PropTypes.bool,
  small: PropTypes.bool,
};

export default ArticleHeading;
