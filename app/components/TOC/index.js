import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Typography as T, Icon } from '@datapunt/asc-ui';
import chevronRight from '@datapunt/asc-assets/lib/Icons/Chevron-Right.svg';

import { Heading } from 'containers/AccommodationObjectPage/styled';

const StyledT = styled(T)`
  padding: 0 !important;
`;

const StyledIcon = styled(Icon)`
  vertical-align: top;
  margin-right: 5px;
`;

const Li = styled.li`
  margin: 0 !important;
  line-height: 34px;
`;

const TOC = ({ sections }) => {
  const [active, setActive] = useState();
  return (
    <>
      <Heading marginCollapse small>
        Op deze pagina
      </Heading>
      <ul className="links">
        {sections.filter(Boolean).map(section => (
          <Li key={section}>
            <StyledT
              element="a"
              href={`#${section}`}
              onClick={() => {
                setActive(section);
              }}
              className={active === section ? 'has-focus' : null}
            >
              <StyledIcon iconUrl={`url('${chevronRight}');`} size={14} padding={0} inline />
              <span className="linklabel">{section}</span>
            </StyledT>
          </Li>
        ))}
      </ul>
    </>
  );
};

TOC.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.string),
};

export default TOC;
