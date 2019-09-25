import React from 'react';
import { render } from 'react-testing-library';
import { ThemeProvider } from '@datapunt/asc-ui';
import 'jest-styled-components';
import { BrowserRouter } from 'react-router-dom';
import SearchHistory from 'components/SearchHistory';

const getRenderedComponent = props =>
  render(
    <ThemeProvider>
      <BrowserRouter>
        <SearchHistory {...props} />
      </BrowserRouter>
    </ThemeProvider>,
  );

describe('SearchHistoryItem', () => {
  it('should not be rendered if no searchHistory is passed', () => {
    const { container } = getRenderedComponent({});
    expect(container.firstChild).toBe(null);
  });

  it('should not be rendered if emtpy searchHistory is passed', () => {
    const { container } = getRenderedComponent({ searchHistory: [] });
    expect(container.firstChild).toBe(null);
  });

  it('should render if searchHistory is passed', () => {
    const { container } = getRenderedComponent({
      searchHistory: [{ text: 'foo', url: '/foo-url' }],
    });
    expect(!!container.firstChild).toBe(true);
  });

  it('should contain searchHistory links', () => {
    const searchHistory = [
      { text: 'fooA', url: '/foo-url-a' },
      { text: 'fooB', url: '/foo-url-b' },
      { text: 'fooC', url: '/foo-url-c' },
      { text: 'fooD', url: '/foo-url-d' },
    ];
    const { container } = getRenderedComponent({ searchHistory });
    expect(container.getElementsByTagName('a').length).toBe(searchHistory.length);
  });
});
