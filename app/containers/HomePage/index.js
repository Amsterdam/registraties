/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';

const HomePage = () => (
  <>
    <img src="https://www.amsterdam.nl/publish/pages/892334/wonen_en_leefomgeving.jpg" alt="" width="940" />
  </>
);

export default HomePage;
