import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import history from 'utils/history';
import { Provider } from 'react-redux';
import Summary from 'components/Summary';

import messages from '../../../translations/nl.json';
import SummaryContainer from '..';
import configureStore from '../../../configureStore';

const store = configureStore({}, history);

describe('containers/Summary', () => {
  it('should have props from structured selector', () => {
    const tree = mount(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <SummaryContainer />
        </IntlProvider>
      </Provider>,
    );

    const props = tree.find(Summary).props();
    const propNames = Object.keys(props);

    expect(propNames.includes('data')).toEqual(true);

    // has to be wrapped with injectIntl HOC
    expect(propNames.includes('intl')).toEqual(true);
  });
});
