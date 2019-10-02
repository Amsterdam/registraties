import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { Provider } from 'react-redux';
import history from 'utils/history';
import 'jest-styled-components';
import { ThemeProvider } from '@datapunt/asc-ui';
import { IntlProvider } from 'react-intl';
import Search from '..';
import configureStore from '../../../configureStore';
import messages from '../../../translations/nl.json';

const store = configureStore({}, history);
const intlProvider = new IntlProvider({ locale: 'nl', messages });
const { intl } = intlProvider.getChildContext();

describe('Search', () => {
  const results = {
    Adressen: [
      {
        name: 'Foo bar',
        vboId: '0363010000740956',
      },
      {
        name: 'Bar baz',
        vboId: '0363010000740957',
      },
    ],
  };

  const testProps = {
    onChange: () => {},
    onSelect: () => {},
    onSuggestionSelect: () => {},
    formLegendLabel: 'Legend text',
    searchLabel: 'Toggle text',
    searchTermLabel: 'Term text',
    searchHintLabel: 'Hint text',
  };

  const renderSearch = props => (
    <ThemeProvider>
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages} intl={intl}>
          <Search {...props} />
        </IntlProvider>
      </Provider>
    </ThemeProvider>
  );

  afterEach(cleanup);

  it('matches the snapshot', () => {
    const { container, getByText } = render(renderSearch(testProps));

    expect(container.firstChild).toMatchSnapshot();
    expect(getByText('Legend text')).not.toBeUndefined();
    expect(getByText('Toggle text')).not.toBeUndefined();
    expect(getByText('Term text')).not.toBeUndefined();
    expect(getByText('Hint text')).not.toBeUndefined();

    // it should hide the search from print view and not display the legend
    expect(container.firstChild.classList).toContain('no-print');
    expect(container.getElementsByTagName('legend')[0].classList).toContain('visuallyhidden');
  });

  it('should render results', () => {
    const { container, getByText } = render(renderSearch({ ...testProps, results }));

    expect(container.firstChild).toMatchSnapshot();

    expect(getByText('Adressen')).not.toBeUndefined();
    expect(getByText('Foo bar')).not.toBeUndefined();
    expect(getByText('Bar baz')).not.toBeUndefined();
  });

  it('should show the search form', () => {
    const foldoutProps = { ...testProps, startFoldedOut: true };
    const { getByTestId } = render(renderSearch(foldoutProps));
    const foldOut = getByTestId('search-foldout');

    expect(foldOut).toHaveStyleRule('display', 'block');
  });

  it('should toggle the display of the form', () => {
    const { getByTestId } = render(renderSearch(testProps));

    const foldOut = getByTestId('search-foldout');

    expect(foldOut).toHaveStyleRule('display', 'none');

    // disabling error(), because jsdom outputs the error 'Not implemented: HTMLFormElement.prototype.submit' when
    // click events in the form bubble up to the actual HTMLFormElement
    global.console.error = jest.fn();

    fireEvent(
      getByTestId('search-toggle'),
      new MouseEvent('click', {
        bubbles: true,
      }),
    );

    expect(foldOut).toHaveStyleRule('display', 'block');

    fireEvent(
      getByTestId('search-toggle'),
      new MouseEvent('click', {
        bubbles: true,
      }),
    );

    expect(foldOut).toHaveStyleRule('display', 'none');

    global.console.error.mockRestore();
  });

  it('should call the onFocus handler', () => {
    const onFocus = jest.fn();
    render(renderSearch({ ...testProps, onFocus }));

    document.getElementById('searchInput').focus();

    expect(onFocus).toHaveBeenCalled();
  });

  it('should call the onChange handler', () => {
    const onChange = jest.fn();
    render(renderSearch({ ...testProps, onChange }));

    fireEvent.change(document.getElementById('searchInput'), { target: { value: 'a' } });

    expect(onChange).toHaveBeenCalled();
  });

  it('should call the onSelect handler', () => {
    const onSelect = jest.fn();
    const { getByText } = render(renderSearch({ ...testProps, onSelect, results }));

    const anchor = getByText('Foo bar').closest('a');

    fireEvent(
      anchor,
      new MouseEvent('click', {
        bubbles: true,
      }),
    );

    expect(onSelect).toHaveBeenCalled();
  });

  it('should render loadingIndicator', () => {
    const { queryByTestId } = render(renderSearch({ ...testProps, isLoading: true }));
    expect(queryByTestId('progress-wrapper')).toBeTruthy();
  });

  it('should not render loadingIndicator', () => {
    const { queryByTestId } = render(renderSearch({ ...testProps, isLoading: false }));
    expect(queryByTestId('progress-wrapper')).toBeNull();
  });
});
