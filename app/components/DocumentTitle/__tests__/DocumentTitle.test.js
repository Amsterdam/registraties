import React from 'react';
import { render } from 'react-testing-library';

import DocumentTitle from '..';

describe('DocumentTitle', () => {
  it('should set document title', () => {
    render(<DocumentTitle title="Capitalized with spaces" />);
    expect(document.title).toBe('Capitalized with spaces');
  });
});
