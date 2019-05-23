import React from 'react';
import { render, cleanup } from 'react-testing-library';
import LoadingIndicator from '..';

describe('LoadingIndicator', () => {
  afterEach(cleanup);

  it('matches the snapshot', () => {
    const { container } = render(<LoadingIndicator />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
