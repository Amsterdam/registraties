import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Link from 'components/Link';

const Strong = styled.strong`
  padding-left: 4px;
`;

const StyledLink = styled(Link)`
  margin-left: 4px !important;
`;

const Ul = styled.ul`
  background: white;
  position: absolute;
  border-top: #767676 solid 1px;
  ${({ numItems }) =>
    numItems > 0 &&
    css`
      border: #767676 solid 1px;
    `}
  min-width: 70px;
  max-width: 620px;
  width: 100%;
  top: calc(100% - 4px);
  padding-top: 8px !important;
  z-index: -1;
`;

/* eslint-disable indent,react/jsx-indent */
const Suggest = forwardRef(({ className, items, onSelect }, ref) => {
  const numItems = Object.keys(items).length;
  return (
    <Ul className={`${className} links`} ref={ref} numItems={numItems}>
      {numItems > 0
        ? Object.keys(items).map(key => (
            <li key={key}>
              <Strong>{key}</Strong>
              <ul className="links">
                {items[key].map(item => (
                  <li key={`${item.name}_${item.vboId || item.ligId || item.brkId}`}>
                    <StyledLink
                      href="/"
                      data-vbo-id={item.vboId}
                      data-lig-id={item.ligId}
                      data-brk-id={item.brkId}
                      onClick={onSelect}
                      label={item.name}
                    />
                  </li>
                ))}
              </ul>
            </li>
          ))
        : null}
    </Ul>
  );
});

Suggest.defaultProps = {
  className: ``,
};

Suggest.propTypes = {
  className: PropTypes.string,
  items: PropTypes.shape({
    Adressen: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        brkId: PropTypes.string,
        vboId: PropTypes.string,
        ligId: PropTypes.string,
      }),
    ),
    Monumenten: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        brkId: PropTypes.string,
        vboId: PropTypes.string,
        ligId: PropTypes.string,
      }),
    ),
    'Kadastrale objecten': PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        brkId: PropTypes.string,
        vboId: PropTypes.string,
        ligId: PropTypes.string,
      }),
    ),
  }),
  onSelect: PropTypes.func.isRequired,
};

export default Suggest;
