import React from 'react';
// import * as effects from 'redux-saga/effects';
// import { render, cleanup, fireEvent } from 'react-testing-library';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import history from 'utils/history';
import { Provider } from 'react-redux';

// import * as actions from 'containers/App/actions';

import messages from '../../../translations/nl.json';
import AccommodationObjectPageContainer from '..';

import configureStore from '../../../configureStore';
const store = configureStore({ global: { status: undefined } }, history);

describe('AccommodationObjectPageContainer', () => {
  it('should export a composed component', () => {
    expect(AccommodationObjectPageContainer).toBeInstanceOf('Foo');
  });

  it('should inject saga', () => {
    // const putSpy = jest.spyOn(effects, 'put');
    const vboId = 'fooBarBaz';

    const tree = mount(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <AccommodationObjectPageContainer match={{ params: { vboId } }} />
        </IntlProvider>
      </Provider>,
    );

    console.log(tree.find(AccommodationObjectPageContainer).props());
  });
});
