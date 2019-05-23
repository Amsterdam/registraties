import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-styled-components';

import ArticleHeading from '..';

describe('ArticleHeading', () => {
  afterEach(cleanup);

  it('should match the snapshot', () => {
    const { container, rerender } = render(
      <ArticleHeading marginCollapse small>
        Here be the heading content
      </ArticleHeading>,
    );
    expect(container.firstChild).toMatchSnapshot();

    rerender(<ArticleHeading>Text</ArticleHeading>);
    expect(container.firstChild).not.toHaveStyleRule('margin-top', '0');
    expect(container.firstChild).not.toHaveStyleRule('font-size', '20px');

    rerender(<ArticleHeading marginCollapse>More text</ArticleHeading>);
    expect(container.firstChild).toHaveStyleRule('margin-top', '0');

    rerender(<ArticleHeading small>Yet more text</ArticleHeading>);
    expect(container.firstChild).toHaveStyleRule('font-size', '20px');
  });
});
