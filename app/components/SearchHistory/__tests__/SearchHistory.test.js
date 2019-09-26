import React from 'react';
import { render } from 'react-testing-library';
import { ThemeProvider } from '@datapunt/asc-ui';
import { IntlProvider } from 'react-intl';
import 'jest-styled-components';
import { BrowserRouter } from 'react-router-dom';
import SearchHistory from 'components/SearchHistory';
import messages from '../../../translations/nl.json';

const intlProvider = new IntlProvider({ locale: 'nl', messages });
const { intl } = intlProvider.getChildContext();

const getRenderedComponent = props =>
  render(
    <ThemeProvider>
      <BrowserRouter>
        <SearchHistory {...props} intl={intl} />
      </BrowserRouter>
    </ThemeProvider>,
  );

describe('SearchHistory', () => {
  it('should not be rendered if no searchHistory is passed', () => {
    const { container } = getRenderedComponent({});
    expect(container.firstChild).toBeNull();
  });

  it('should not be rendered if emtpy searchHistory is passed', () => {
    const { container } = getRenderedComponent({ searchHistory: [] });
    expect(container.firstChild).toBeNull();
  });

  it('should render if searchHistory is passed', () => {
    const { container } = getRenderedComponent({
      searchHistory: [{ text: 'foo', url: '/foo-url', id: 'id' }],
    });
    expect(container.firstChild).toBeTruthy();
  });

  it('should contain searchHistory links', () => {
    const searchHistory = [
      { text: 'fooA', url: '/foo-url-a', id: 'id-a' },
      { text: 'fooB', url: '/foo-url-b', id: 'id-b' },
      { text: 'fooC', url: '/foo-url-c', id: 'id-c' },
      { text: 'fooD', url: '/foo-url-d', id: 'id-d' },
    ];
    const { container } = getRenderedComponent({ searchHistory });
    expect(container.getElementsByTagName('a').length).toBe(searchHistory.length);
  });

  it('should contain a description label', () => {
    const { getByText } = getRenderedComponent({
      searchHistory: [{ text: 'foo', url: '/foo-url', id: 'id' }],
    });

    const label = messages['registraties.search_history_header'];
    expect(getByText(`${label}:`)).toBeTruthy();
  });
});
