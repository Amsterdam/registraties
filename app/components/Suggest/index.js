import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'components/Link';

const Strong = styled.strong`
  padding-left: 4px;
`;

const Suggest = ({ className, items, onSelect }) => (
  <ul className={`${className} links`}>
    {Object.keys(items).map(key => (
      <li key={key}>
        <Strong>{key}</Strong>
        <ul className="links">
          {items[key].map(item => (
            <li key={`${item.name}_${item.vboId || item.ligId || item.brkId}`}>
              <Link
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
  </ul>
);

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
