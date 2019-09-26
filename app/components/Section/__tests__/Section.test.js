import React from 'react';
import { render } from 'react-testing-library';
import { mount } from 'enzyme';
import 'jest-styled-components';
import { IntlProvider, FormattedNumber } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import * as utils from 'utils';

import configureStore from '../../../configureStore';
import Section, { printValue, renderList } from '..';
import messages from '../../../translations/nl.json';
import pand from './pand.json';
import subjectNP from './subjectNP.json';
import vestiging from './vestiging.json';

const { store } = configureStore({}, browserHistory);
const intlProvider = new IntlProvider({ locale: 'nl', messages });
const { intl } = intlProvider.getChildContext();

describe('Section', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <Section name="Qux baz" />
        </IntlProvider>
      </Provider>,
    );

    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementsByTagName('section')).toHaveLength(1);
  });

  it('should render an external link', () => {
    const { container, rerender } = render(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <Section name="Qux baz" />
        </IntlProvider>
      </Provider>,
    );

    const anchors = container.getElementsByTagName('a');
    expect(anchors).toHaveLength(0);

    rerender(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <Section name="Qux baz" href="https://www.amsterdam.nl" />
        </IntlProvider>
      </Provider>,
    );

    expect(anchors).toHaveLength(1);
    expect(anchors[0].getAttribute('target')).toBe('_blank');
    expect(anchors[0].getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('should render a loading indicator', () => {
    const { rerender, queryByTestId } = render(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <Section name="Bar bar baz" />
        </IntlProvider>
      </Provider>,
    );

    expect(queryByTestId('progress-wrapper')).not.toBeNull();

    rerender(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <Section name="Bar bar baz" data={null} />
        </IntlProvider>
      </Provider>,
    );

    expect(queryByTestId('progress-wrapper')).toBeNull();
  });

  it('should not render the title when there is no data', () => {
    // selectors return 'undefined' when the app saga didn't retrieve the data yet. After retrieval, when the response is empty,
    // the saga returns 'null'
    const { rerender, queryByText } = render(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <Section name="Foo bar baz" />
        </IntlProvider>
      </Provider>,
    );

    expect(queryByText('Foo bar baz')).not.toBeNull();

    rerender(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <Section name="Foo bar baz" data={null} />
        </IntlProvider>
      </Provider>,
    );

    expect(queryByText('Foo bar baz')).toBeNull();
  });

  it('should verify if data items are arrays', () => {
    const isArraySpy = jest.spyOn(utils, 'isArray');
    const data = [pand[0], pand[1]];
    const { rerender } = render(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <Section name="Foo bar baz" intl={intl} data={data} />
        </IntlProvider>
      </Provider>,
    );

    expect(isArraySpy).toHaveBeenCalledWith(data[0]);
    expect(isArraySpy).toHaveBeenLastCalledWith(data[1]);
    expect(document.getElementsByTagName('li')).toHaveLength(2);

    isArraySpy.mockReset();

    const data2 = [[pand[2]]];

    rerender(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <Section name="Foo bar baz" intl={intl} data={data2} />
        </IntlProvider>
      </Provider>,
    );

    expect(isArraySpy).toHaveBeenCalledWith(data2[0]);
    expect(document.getElementsByTagName('li')).toHaveLength(1);

    isArraySpy.mockReset();

    const data3 = subjectNP;

    render(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <Section name="Foo bar baz" intl={intl} data={data3} />
        </IntlProvider>
      </Provider>,
    );

    expect(document.getElementsByTagName('ul')).toHaveLength(2);

    isArraySpy.mockRestore();
  });

  it('should render section contents', () => {
    const data = pand;
    const numValues = data.length;

    render(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <Section name="Foo bar baz" intl={intl} data={data} />
        </IntlProvider>
      </Provider>,
    );

    expect(document.getElementsByTagName('li')).toHaveLength(numValues);
  });
});

describe('printValue', () => {
  it('should return a formatted value', () => {
    const metaNumber = {
      type: 'number',
      formattedValue: 19000,
    };
    const metaCurrency = {
      type: 'currency',
      formattedValue: 875647625,
    };
    const metaSurface = {
      type: 'surface',
      formattedValue: 365,
    };
    const metaOther = {
      type: 'string',
      formattedValue: 365,
    };

    const numberTree = mount(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          {printValue(metaNumber)}
        </IntlProvider>
      </Provider>,
    );

    expect(numberTree.find(FormattedNumber)).not.toBeUndefined();

    const currencyTree = mount(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          {printValue(metaCurrency)}
        </IntlProvider>
      </Provider>,
    );

    expect(currencyTree.find(FormattedNumber)).not.toBeUndefined();
    expect(
      currencyTree
        .find(FormattedNumber)
        .children()
        .first()
        .text()
        .slice(0, 1),
    ).toEqual('€');

    const surfaceTree = mount(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          {printValue(metaSurface)}
        </IntlProvider>
      </Provider>,
    );

    expect(surfaceTree.find(FormattedNumber)).not.toBeUndefined();
    expect(surfaceTree.find('sup')).not.toBeUndefined();
    expect(surfaceTree.find('sup').text()).toEqual('2');

    const otherTree = mount(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <span>{printValue(metaOther)}</span>
        </IntlProvider>
      </Provider>,
    );

    expect(otherTree.find(FormattedNumber)).toHaveLength(0);
    expect(otherTree.text()).toEqual(metaOther.formattedValue.toString());
  });
});

describe('renderList', () => {
  it('should render a List', () => {
    const { rerender } = render(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          {renderList(pand)}
        </IntlProvider>
      </Provider>,
    );

    expect(document.getElementsByTagName('ul')).toHaveLength(1);

    rerender(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          {renderList([vestiging])}
        </IntlProvider>
      </Provider>,
    );

    expect(document.getElementsByTagName('ul')).toHaveLength(5);
  });

  it('should set the correct class name', () => {
    const { rerender } = render(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          {renderList(pand)}
        </IntlProvider>
      </Provider>,
    );

    expect(document.getElementsByTagName('ul')[0].classList.contains('depth-0')).toEqual(false);

    rerender(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          {renderList(pand, 0)}
        </IntlProvider>
      </Provider>,
    );

    expect(document.getElementsByTagName('ul')[0].classList.contains('depth-0')).toEqual(true);

    rerender(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          {renderList(pand, 100)}
        </IntlProvider>
      </Provider>,
    );

    expect(document.getElementsByTagName('ul')[0].classList.contains('depth-100')).toEqual(true);
  });
});
