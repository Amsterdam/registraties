import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-styled-components';

import SectionHeading from '..';

describe('SectionHeading', () => {
  afterEach(cleanup);

  it('should match the snapshot', () => {
    const { container, rerender } = render(
      <SectionHeading marginCollapse>Here be the section heading content</SectionHeading>,
    );
    expect(container.firstChild).toHaveStyleRule('margin-top', '0');
    expect(container.firstChild).toMatchSnapshot();

    rerender(<SectionHeading>Text</SectionHeading>);
    expect(container.firstChild).toHaveStyleRule('margin-top', '0', {
      media: 'print',
    });
    expect(container.firstChild).not.toHaveStyleRule('margin-top', '0');
  });
});
