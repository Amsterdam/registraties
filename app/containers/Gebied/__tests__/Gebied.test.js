import React from 'react';
import { mount } from 'enzyme';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import history from 'utils/history';
import { Provider } from 'react-redux';
import { LOAD_DATA_FAILED } from 'containers/App/constants';

import { intl } from '../../../../internals/testing/test-utils';
import messages from '../../../translations/nl.json';
import GebiedContainer, { GebiedContainerComponent } from '..';
import configureStore from '../../../configureStore';

const { store } = configureStore({}, history);

describe('containers/Gebied', () => {
  it('should have props from structured selector', () => {
    const vboId = 'fooBarBaz';
    const tree = mount(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <GebiedContainer match={{ params: { vboId } }} />
        </IntlProvider>
      </Provider>,
    );
    const props = tree.find(GebiedContainerComponent).props();
    const propNames = Object.keys(props);

    expect(propNames.includes('data')).toEqual(true);
    expect(propNames.includes('status')).toEqual(true);

    // has to be wrapped with injectIntl HOC
    expect(propNames.includes('intl')).toEqual(true);
  });

  it('should render a Section component', () => {
    const intlObj = intl({ messages });
    const vboId = 'fooBarBaz';

    const { rerender } = render(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <GebiedContainerComponent match={{ params: { vboId } }} intl={intlObj} />
        </IntlProvider>
      </Provider>,
    );

    expect(document.getElementsByTagName('section')).toHaveLength(1);

    rerender(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <GebiedContainerComponent match={{ params: { vboId } }} intl={intlObj} status={LOAD_DATA_FAILED} />
        </IntlProvider>
      </Provider>,
    );

    expect(document.getElementsByTagName('section')).toHaveLength(0);
  });
});
