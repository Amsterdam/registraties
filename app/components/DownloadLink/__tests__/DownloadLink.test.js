import React from 'react';
import { render, cleanup } from 'react-testing-library';
import DownloadLink from '..';

describe('DownloadLink', () => {
  afterEach(cleanup);

  it('matches the snapshot', () => {
    const { container, rerender } = render(<DownloadLink name="filename.csv" />);

    expect(container.firstChild).toMatchSnapshot();

    rerender(<DownloadLink name="filename.csv" disabled />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should have a value for the `download` attribute', () => {
    const { container } = render(<DownloadLink name="filename.csv" />);
    expect(container.firstChild.getAttribute('download')).toBe('filename.csv');
  });

  it('should render an achor element', () => {
    const { container } = render(<DownloadLink name="filename.csv" />);
    expect(container.firstChild).toBeInstanceOf(HTMLAnchorElement);
  });

  it('should have a negative tab-index when disabled', () => {
    const { container, rerender } = render(<DownloadLink name="filename.csv" />);

    expect(container.firstChild.tabIndex).toEqual(0);

    rerender(<DownloadLink name="filename.csv" disabled />);

    expect(container.firstChild.tabIndex).toEqual(-1);
  });
});
