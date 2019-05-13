import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Typography as T, Icon } from '@datapunt/asc-ui';
import chevronRight from '@datapunt/asc-assets/lib/Icons/Chevron-Right.svg';

const StyledT = styled(T)`
  padding: 0 !important;
`;

const StyledIcon = styled(Icon)`
  vertical-align: baseline;
  margin-right: 5px;
`;

const Link = ({ href, onClick, className, label, ...rest }) => (
  <StyledT element="a" href={href} onClick={onClick} className={className} {...rest}>
    <StyledIcon iconUrl={`url('${chevronRight}');`} size={14} padding={0} inline />
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
