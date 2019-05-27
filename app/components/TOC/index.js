import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { intlShape } from 'react-intl';

import SectionHeading from 'components/SectionHeading';
import messages from 'containers/App/messages';
import Link from 'components/Link';
import LoadingIndicator from 'components/LoadingIndicator';

const Li = styled.li`
  margin: 0 !important;
  line-height: 34px;

  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    a {
      height: 22px;
    }
  }
`;

const TOC = ({ intl, sections }) => {
  const [active, setActive] = useState();

  if (!sections) return null;

  const titles = sections.filter(Boolean);

  if (!titles.length) return <LoadingIndicator />;

  return (
    <>
      <SectionHeading marginCollapse className="no-print">
        {intl.formatMessage(messages.on_this_page)}
      </SectionHeading>

      <ul className="links no-print">
        {titles.map(section => {
          const title = intl.formatMessage(section);

          return (
            <Li key={title}>
              <Link
                href={`#${title}`}
                onClick={() => {
                  setActive(title);
                }}
                className={active === title ? 'has-focus' : null}
                label={title}
              />
            </Li>
          );
        })}
      </ul>
    </>
  );
};

TOC.propTypes = {
  intl: intlShape.isRequired,
  sections: PropTypes.arrayOf(PropTypes.shape({})),
};

export default TOC;
