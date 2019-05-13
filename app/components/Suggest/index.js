import React from 'react';
import PropTypes from 'prop-types';
import { Typography as T } from '@datapunt/asc-ui';

const Suggest = ({ className, items, onSelect }) => (
  <ul className={`${className} links`}>
    {items.map(item => (
      <li key={item.name}>
        <T element="a" href="#" data-vbo-id={item.vboId} data-lig-id={item.ligId} onClick={onSelect}>
          {item.name}
        </T>
      </li>
    ))}
  </ul>
);

Suggest.defaultProps = {
  className: ``,
};

Suggest.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      vboId: PropTypes.string,
      ligId: PropTypes.string,
    }),
  ),
  onSelect: PropTypes.func.isRequired,
};

export default Suggest;
