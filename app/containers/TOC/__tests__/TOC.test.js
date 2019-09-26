import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import history from 'utils/history';
import { Provider } from 'react-redux';

import TOC from 'components/TOC';
import messages from '../../../translations/nl.json';
import TOCContainer from '..';
import configureStore from '../../../configureStore';

const { store } = configureStore({}, history);
describe('containers/TOC', () => {
  it('should have props from structured selector', () => {
    const tree = mount(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <TOCContainer />
        </IntlProvider>
      </Provider>,
    );

    const TOCComponent = tree.find(TOC);

    expect(TOCComponent).not.toBeNull();

    const props = TOCComponent.props();
    const propNames = Object.keys(props);

    expect(propNames.includes('sections')).toEqual(true);
    // has to be wrapped with injectIntl HOC
    expect(propNames.includes('intl')).toEqual(true);
  });
});
