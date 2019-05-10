import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Heading } from 'containers/AccommodationObjectPage/styled';

import './style.scss';

const TOC = ({ sections }) => {
  const [active, setActive] = useState();
  return (
    <>
      <Heading marginCollapse small>
        Op deze pagina
      </Heading>
      <ul className="links">
        {sections.filter(Boolean).map(section => (
          <li key={section}>
            <a
              href={`#${section}`}
              onClick={() => {
                setActive(section);
              }}
              className={active === section ? 'has-focus' : null}
            >
              <span className="linklabel">{section}</span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

TOC.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.string),
};

export default TOC;
