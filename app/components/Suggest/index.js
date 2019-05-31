import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'components/Link';

const Strong = styled.strong`
  padding-left: 4px;
`;

const StyledLink = styled(Link)`
  margin-left: 4px !important;
`;

const Ul = styled.ul`
  background: white;
  border-top: none;
  border: #767676 solid 1px;
  width: 100%;

  li:first-of-type {
    margin-top: 8px !important;
  }

  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    a {
      height: 26px;
    }
  }
`;

/* eslint-disable indent,react/jsx-indent */
const Suggest = forwardRef(({ className, items, onSelect }, ref) => {
  if (!items) return null;

  const numItems = Object.keys(items).length;

  if (!numItems) return null;

  return (
    <Ul className={`${className} links`} ref={ref} numItems={numItems}>
      {Object.keys(items).map(key => (
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
      ))}
    </Ul>
  );
});

Suggest.defaultProps = {
  className: ``,
  items: null,
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
