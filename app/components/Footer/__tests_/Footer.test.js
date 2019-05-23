import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Footer from '..';

describe('Footer', () => {
  afterEach(cleanup);

  it('matches the snapshot', () => {
    const { container } = render(<Footer />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render the general phone number', () => {
    const { getByText } = render(<Footer />);

    const phoneNumberElement = getByText('14 020');
    expect(phoneNumberElement).not.toBeUndefined();
    expect(phoneNumberElement).toBeInstanceOf(HTMLAnchorElement);
  });
});
