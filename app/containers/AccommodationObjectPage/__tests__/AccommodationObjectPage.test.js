import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import history from 'utils/history';
import { Provider } from 'react-redux';

import { loadBAGData } from 'containers/App/actions';

import messages from '../../../translations/nl.json';
import AccommodationObjectPageContainer, { AccommodationObjectPageComponent } from '..';
import configureStore from '../../../configureStore';

const { store } = configureStore({}, history);

describe('containers/AccommodationObjectPage', () => {
  it('should have props from structured selector', () => {
    const vboId = 'fooBarBaz';
    const tree = mount(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <AccommodationObjectPageContainer match={{ params: { vboId } }} />
        </IntlProvider>
      </Provider>,
    );

    const props = tree.find(AccommodationObjectPageComponent).props();

    expect(props.summary).toEqual({});
    expect(props.status).not.toBeUndefined();
    expect(props.loadBAGData).not.toBeUndefined();
    expect(props.loadBAGData({ vboId })).toEqual(loadBAGData({ vboId }));
  });
});
