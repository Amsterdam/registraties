import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  width: ${({ now }) => Math.floor(now * 100)}vw;
  background: #00a03c;
  transition: width 0.25s ease-in-out, opacity 0.7s 1s ease-out;
  z-index: 102;
  opacity: ${({ now }) => (now >= 1 ? 0 : 1)};
  box-shadow: 0 0 10px rgba(0, 160, 60, 0.7);
`;

const Progress = props => <Bar {...props} />;

Progress.defaultProps = {
  now: 0,
};

Progress.propTypes = {
  now: PropTypes.number,
};

export default Progress;
