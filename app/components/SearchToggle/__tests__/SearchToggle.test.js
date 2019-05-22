import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import 'jest-styled-components';
import SearchToggle from '..';

describe('SearchToggle', () => {
  afterEach(cleanup);

  it('matches the snapshot', () => {
    const { container, rerender, queryByTestId } = render(<SearchToggle label="Foo bar" />);

    expect(queryByTestId('searchToggle-close-icon')).toBeNull();
    expect(queryByTestId('searchToggle-search-icon')).not.toBeNull();
    expect(queryByTestId('searchToggle-label').classList).toContain('visuallyhidden');
    expect(container.firstChild).toMatchSnapshot();

    rerender(<SearchToggle label="Foo bar" active />);

    expect(queryByTestId('searchToggle-close-icon')).not.toBeNull();
    expect(queryByTestId('searchToggle-search-icon')).toBeNull();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('calls the onClick handler', () => {
    const onClick = jest.fn();
    const { container } = render(<SearchToggle label="Foo bar" onClick={onClick} />);

    fireEvent(
      container.firstChild,
      new MouseEvent('click', {
        bubbles: true,
      }),
    );

    expect(onClick).toHaveBeenCalled();
  });
});
