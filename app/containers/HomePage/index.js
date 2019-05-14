import React from 'react';
import styled from 'styled-components';
import { compose } from 'redux';
import withSelector from 'containers/withSelector';

const Img = styled.img`
  width: 100%;
`;

const HomePage = () => (
  <picture>
    <source
      media="(min-width: 700px)"
      srcSet="//www.amsterdam.nl/publish/pages/830657/herengracht_met_fietsenrekken_eis_940x264.jpg"
    />
    <source
      media="(max-width: 700px)"
      srcSet="//www.amsterdam.nl/publish/pages/830657/700px/herengracht_met_fietsenrekken_eis_940x264.jpg"
    />
    <source
      media="(max-width: 460px)"
      srcSet="//www.amsterdam.nl/publish/pages/830657/460px/herengracht_met_fietsenrekken_eis_940x264.jpg"
    />
    <source
      media="(max-width: 220px)"
      srcSet="//www.amsterdam.nl/publish/pages/830657/220px/herengracht_met_fietsenrekken_eis_940x264.jpg"
    />
    <Img src="//www.amsterdam.nl/publish/pages/830657/80px/herengracht_met_fietsenrekken_eis_940x264.jpg" alt="" />
  </picture>
);

export default compose(withSelector)(HomePage);
