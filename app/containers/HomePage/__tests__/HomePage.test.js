import React from 'react';
import { render } from 'react-testing-library';

import HomePage from '..';

describe('containers/Homepage', () => {
  it('should render a picture element', () => {
    render(<HomePage />);
    expect(document.getElementsByTagName('picture')).not.toBeNull();
  });
});
