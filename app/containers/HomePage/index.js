import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
  width: 100%;
`;

const Picture = styled.picture`
  max-width: 100%;
  width: 100%;
`;

const HomePage = () => (
  <Picture>
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
    <Img srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="" />
  </Picture>
);

export default HomePage;
