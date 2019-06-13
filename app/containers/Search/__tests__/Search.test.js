import React from 'react';
import { mount } from 'enzyme';
import { render, fireEvent } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import history from 'utils/history';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@datapunt/asc-ui';

import { intl } from '../../../../internals/testing/test-utils';
import messages from '../../../translations/nl.json';
import SearchContainer, { SearchContainerComponent } from '..';
import configureStore from '../../../configureStore';
import { initialState } from '../reducer';
import { makeSelectResults } from '../selectors';
import resultsSrc from './results.json';

const store = configureStore({}, history);
const intlObj = intl({ messages });
const results = makeSelectResults({ search: { ...initialState, results: resultsSrc } });

describe('containers/KadastraalSubjectNNP', () => {
  it('should have props from structured selector', () => {
    const tree = mount(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <SearchContainer />
        </IntlProvider>
      </Provider>,
    );

    expect(tree.find(SearchContainerComponent)).not.toBeNull();

    const props = tree.find(SearchContainerComponent).props();
    const propNames = Object.keys(props);

    expect(propNames.includes('show')).toEqual(true);
    expect(propNames.includes('results')).toEqual(true);
    expect(propNames.includes('onSearchSelect')).toEqual(true);
    expect(propNames.includes('onChange')).toEqual(true);

    // has to be wrapped with injectIntl HOC
    expect(propNames.includes('intl')).toEqual(true);
  });

  it('should call the onChange handler', () => {
    const onChange = jest.fn();
    const props = {
      onChange,
      onSearchSelect: () => {},
      intl: intlObj,
    };

    render(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <SearchContainerComponent {...props} />
        </IntlProvider>
      </Provider>,
    );

    const value = 'Here be dragons';
    const input = document.getElementById('searchInput');

    fireEvent.change(input, { target: { value } });

    expect(onChange).toHaveBeenCalledWith(value);
  });

  it('should call the onSearchSelect handler', () => {
    const onSearchSelect = jest.fn();
    const props = {
      onChange: () => {},
      onSearchSelect,
      intl: intlObj,
      results,
    };

    render(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <ThemeProvider>
            <SearchContainerComponent {...props} />
          </ThemeProvider>
        </IntlProvider>
      </Provider>,
    );

    const suggestItems = document.getElementsByTagName('a');
    const item = suggestItems[0];
    const [key, value] = Object.entries(item.dataset)[0];

    fireEvent.click(suggestItems[0]);

    expect(onSearchSelect).toHaveBeenCalledWith({ [key]: value });
  });

  it('should handle focusout events', () => {
    const props = {
      onChange: () => {},
      onSearchSelect: () => {},
      intl: intlObj,
      results,
    };

    render(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <ThemeProvider>
            <SearchContainerComponent {...props} />
          </ThemeProvider>
        </IntlProvider>
      </Provider>,
    );

    const input = document.getElementById('searchInput');
    const linksLength = document.getElementsByClassName('links').length;
    const suggest = document.getElementsByClassName('links')[0].parentElement;

    expect(document.getElementsByClassName('links').length).toBeGreaterThan(0);

    // put focus on input element
    fireEvent(
      input,
      new MouseEvent('focus', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(document.getElementsByClassName('links')).toHaveLength(linksLength);

    // tab out of input field and into Suggest component
    fireEvent.keyDown(input, { key: 'Tab', code: 9 });

    expect(document.getElementsByClassName('links')).toHaveLength(linksLength);

    // put focus back on input element
    fireEvent(
      input,
      new MouseEvent('focus', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(document.getElementsByClassName('links')).toHaveLength(linksLength);

    // remove focus from input element and move focus to Suggest component by clicking
    fireEvent(
      input,
      new MouseEvent('focusout', {
        bubbles: true,
        cancelable: true,
        relatedTarget: suggest,
      }),
    );

    expect(document.getElementsByClassName('links')).toHaveLength(linksLength);

    // remove focus from Suggest component and move focus to input element  by clicking
    fireEvent(
      suggest,
      new MouseEvent('focusout', {
        bubbles: true,
        cancelable: true,
        relatedTarget: input,
      }),
    );

    expect(document.getElementsByClassName('links')).toHaveLength(linksLength);

    // remove focus from input element
    fireEvent(
      input,
      new MouseEvent('focusout', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(document.getElementsByClassName('links')).toHaveLength(0);

    // put focus back on input element
    fireEvent(
      input,
      new MouseEvent('focus', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(document.getElementsByClassName('links')).toHaveLength(linksLength);

    // move focus to Suggest component by clicking
    fireEvent(
      suggest,
      new MouseEvent('focus', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(document.getElementsByClassName('links')).toHaveLength(linksLength);

    // remove focus from Suggest component
    fireEvent(
      suggest,
      new MouseEvent('focusout', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(document.getElementsByClassName('links')).toHaveLength(0);
  });

  it('should prevent the form from being submit', () => {});
});
