import React from 'react';
import { render, cleanup } from 'react-testing-library';

import DocumentTitle from '..';

describe('DocumentTitle', () => {
  afterEach(cleanup);

  it('should set document title', () => {
    render(<DocumentTitle title="Capitalized with spaces" />);
    expect(document.title).toBe('Capitalized with spaces');
  });
});
