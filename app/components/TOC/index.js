import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { intlShape } from 'react-intl';

import { Heading } from 'containers/AccommodationObjectPage/styled';
import messages from 'containers/App/messages';
import Link from 'components/Link';

const Li = styled.li`
  margin: 0 !important;
  line-height: 34px;
`;

const TOC = ({ intl, sections }) => {
  const [active, setActive] = useState();
  return (
    <>
      <Heading marginCollapse small>
        {intl.formatMessage(messages.on_this_page)}
      </Heading>
      <ul className="links">
        {sections.filter(Boolean).map(section => (
          <Li key={section}>
            <Link
              href={`#${section}`}
              onClick={() => {
                setActive(section);
              }}
              className={active === section ? 'has-focus' : null}
              label={section}
            />
          </Li>
        ))}
      </ul>
    </>
  );
};

TOC.propTypes = {
  intl: intlShape.isRequired,
  sections: PropTypes.arrayOf(PropTypes.string),
};

export default TOC;
