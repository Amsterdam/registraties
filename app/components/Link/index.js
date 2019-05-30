import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Typography as T } from '@datapunt/asc-ui';
import ChevronRight from '@datapunt/asc-assets/lib/Icons/Chevron-Right.svg';

const StyledT = styled(T)`
  padding: 0 !important;

  &:focus {
    outline: 4px solid #ffc90e !important;
  }

  &:hover,
  &:focus {
    color: #ec0000;
    fill: #ec0000;
  }
`;

const StyledIcon = styled(ChevronRight)`
  vertical-align: baseline;
  margin-right: 5px;
`;

const Link = ({ href, onClick, className, label, ...rest }) => (
  <StyledT element="a" href={href} onClick={onClick} className={className} {...rest}>
    <StyledIcon focusable="false" width={14} />
    <span className="linklabel">{label}</span>
  </StyledT>
);

Link.defaultProps = {
  className: '',
  onClick: null,
};

Link.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Link;
