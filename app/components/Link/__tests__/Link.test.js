import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { ThemeProvider } from '@datapunt/asc-ui';
import 'jest-styled-components';
import Link from '..';

describe('Link', () => {
  afterEach(cleanup);

  it('matches the snapshot', () => {
    const { container } = render(
      <ThemeProvider>
        <Link href="//some-url.com" label="Foo bar" />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild.getAttribute('href')).toBe('//some-url.com');
  });

  it('calls the onClick handler', () => {
    let someVar = 'a';

    const onClick = () => {
      someVar = 'b';
    };

    const { getByText } = render(
      <ThemeProvider>
        <Link href="//some-url.com" label="Bar baz" onClick={onClick} />
      </ThemeProvider>,
    );

    fireEvent(
      getByText('Bar baz'),
      new MouseEvent('click', {
        bubbles: true,
      }),
    );

    expect(someVar).toBe('b');
  });
});
