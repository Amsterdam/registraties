import React from 'react';
import { render } from 'react-testing-library';

import DocumentTitle from '..';

describe('DocumentTitle', () => {
  it('should set document title', () => {
    render(<DocumentTitle title="Capitalized with spaces" />);
    expect(document.title).toBe('Capitalized with spaces');
  });

  it('should reset document title when unmounted', () => {
    const { unmount } = render(<DocumentTitle title="New title" />);
    expect(document.title).toBe('New title');
    unmount();
    expect(document.title).toBe('Registratie');
  });
});
