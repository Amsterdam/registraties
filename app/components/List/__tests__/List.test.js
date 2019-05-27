import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-styled-components';

import List from '..';

describe('List', () => {
  afterEach(cleanup);

  it('should match the snapshot', () => {
    const { container } = render(
      <List>
        <li>Item #1</li>
        <li>Item #2</li>
        <li>Item #3</li>
      </List>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
