import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-styled-components';
import { IntlProvider } from 'react-intl';
import { isArray } from 'utils';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';

import configureStore from '../../../configureStore';
import { SectionComponent as Section } from '..';
import messages from '../../../translations/nl.json';
import pand from './pand.json';
import subjectNP from './subjectNP.json';

const store = configureStore({}, browserHistory);
const intlProvider = new IntlProvider({ locale: 'nl', messages });
const { intl } = intlProvider.getChildContext();

jest.mock('utils', () => {
  const actual = require.requireActual('utils');

  return {
    ...actual,
    isArray: jest.fn(),
  };
});

describe('Section', () => {
  afterEach(cleanup);

  it('matches the snapshot', () => {
    const { container } = render(<Section name="Qux baz" intl={intl} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render an external link', () => {
    const { container, rerender } = render(<Section name="Qux baz" intl={intl} />);

    const anchors = container.getElementsByTagName('a');
    expect(anchors).toHaveLength(0);

    rerender(<Section name="Qux baz" href="https://www.amsterdam.nl" intl={intl} />);

    expect(anchors).toHaveLength(1);
    expect(anchors[0].getAttribute('target')).toBe('_blank');
    expect(anchors[0].getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('should render a loading indicator', () => {
    const { rerender, queryByTestId } = render(<Section name="Bar bar baz" intl={intl} />);

    expect(queryByTestId('progress-wrapper')).not.toBeNull();

    rerender(<Section name="Bar bar baz" intl={intl} data={null} />);

    expect(queryByTestId('progress-wrapper')).toBeNull();
  });

  it('should not render the title when there is no data', () => {
    // selectors return 'undefined' when the app saga didn't retrieve the data yet. After retrieval, when the response is empty,
    // the saga returns 'null'
    const { rerender, queryByText } = render(<Section name="Foo bar baz" intl={intl} />);

    expect(queryByText('Foo bar baz')).not.toBeNull();

    rerender(<Section name="Foo bar baz" intl={intl} data={null} />);

    expect(queryByText('Foo bar baz')).toBeNull();
  });

  it('should verify if data items are arrays', () => {
    const data = [pand[0], pand[1]];
    const { rerender } = render(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <Section name="Foo bar baz" intl={intl} data={data} />
        </IntlProvider>
      </Provider>,
    );

    expect(isArray).toHaveBeenCalledTimes(4); // will call isArrayOfArrays
    expect(isArray).toHaveBeenCalledWith(data[0]);
    expect(isArray).toHaveBeenLastCalledWith(data[1]);
    expect(document.getElementsByTagName('li')).toHaveLength(2);

    isArray.mockReset();

    const data2 = [[pand[2]]];

    rerender(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <Section name="Foo bar baz" intl={intl} data={data2} />
        </IntlProvider>
      </Provider>,
    );

    expect(isArray).toHaveBeenCalledTimes(3);
    expect(isArray).toHaveBeenCalledWith(data2[0]);
    expect(document.getElementsByTagName('li')).toHaveLength(1);

    isArray.mockReset();

    const data3 = subjectNP;

    render(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <Section name="Foo bar baz" intl={intl} data={data3} />
        </IntlProvider>
      </Provider>,
    );

    expect(isArray).toHaveBeenCalledTimes(4);
    expect(document.getElementsByTagName('ul')).toHaveLength(2);
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
