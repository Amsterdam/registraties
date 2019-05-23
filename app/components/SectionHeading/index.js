import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const H3 = styled.h3`
  margin-top: 30px;
  ${({ marginCollapse }) =>
    marginCollapse &&
    css`
      margin-top: 0;
    `}

  @media print {
    margin-top: 0;
  }
`;

const SectionHeading = ({ children, ...rest }) => <H3 {...rest}>{children}</H3>;

SectionHeading.defaultProps = {
  marginCollapse: false,
};

SectionHeading.propTypes = {
  children: PropTypes.node.isRequired,
  marginCollapse: PropTypes.bool,
};

export default SectionHeading;
