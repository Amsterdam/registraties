import React from 'react';
import { render } from 'react-testing-library';
import { ThemeProvider } from '@datapunt/asc-ui';
import 'jest-styled-components';
import { BrowserRouter } from 'react-router-dom';
import SearchHistoryItem from 'components/SearchHistoryItem';

const URL_PROP = '/foo-url/';
const TEXT_PROP = 'foo-text';

const getRenderedComponent = (url, text) =>
  render(
    <ThemeProvider>
      <BrowserRouter>
        <SearchHistoryItem url={url} text={text} />
      </BrowserRouter>
    </ThemeProvider>,
  );
describe('SearchHistoryItem', () => {
  it('is a list item', () => {
    const { container } = getRenderedComponent(URL_PROP, TEXT_PROP);
    expect(container.firstChild.tagName).toEqual('LI');
  });

  it('list item contains a link', () => {
    const { container } = getRenderedComponent(URL_PROP, TEXT_PROP);
    expect(container.firstChild.firstChild.tagName).toEqual('A');
  });

  it('link contains passed text property', () => {
    const { container } = getRenderedComponent(URL_PROP, TEXT_PROP);
    expect(container.firstChild.firstChild.innerHTML).toEqual(TEXT_PROP);
  });

  it('link points to the passed url property', () => {
    const { container } = getRenderedComponent(URL_PROP, TEXT_PROP);
    expect(container.firstChild.firstChild.attributes.href.value).toEqual(URL_PROP);
  });
});
