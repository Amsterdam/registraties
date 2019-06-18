import React from 'react';
import PropTypes from 'prop-types';

import SectionHeading from 'components/SectionHeading';
import { StelselpediaLink } from 'components/AccommodationObject/styled';

const Title = ({ name, href, title }) => (
  <SectionHeading marginCollapse id={name}>
    {name}
    {href && (
      <StelselpediaLink href={href} target="_blank" rel="noopener noreferrer" title={title}>
        <span>i</span>
      </StelselpediaLink>
    )}
  </SectionHeading>
);

Title.propTypes = {
  name: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Title;
