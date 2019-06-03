import React from 'react';
import * as effects from 'redux-saga/effects';
// import { render, cleanup, fireEvent } from 'react-testing-library';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import history from 'utils/history';
import { Provider } from 'react-redux';

import * as actions from 'containers/App/actions';

import messages from '../../../translations/nl.json';
import AccommodationObjectPageContainer from '..';

import configureStore from '../../../configureStore';
const store = configureStore({}, history);

// jest.mock('redux');
jest.mock('redux-saga/effects', () => {
  const actual = jest.requireActual('redux-saga/effects');

  return {
    __esModule: true,
    ...actual,
    put: jest.fn(),
  };
});

describe('AccommodationObjectPageContainer', () => {
  it('should export a composed component', () => {
    // expect(AccommodationObjectPageContainer).toBeInstanceOf()
  });

  it('should inject translations', () => {});

  it('should inject saga', () => {
    const putSpy = jest.spyOn(effects, 'put');
    const vboId = 'fooBarBaz';

    const tree = mount(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <AccommodationObjectPageContainer match={{ params: { vboId } }} />
        </IntlProvider>
      </Provider>,
    );

    tree.debug();

    actions.loadBAGData({ vboId });

    expect(putSpy).toHaveBeenCalledWith('watchAccommodationObjectPageSaga');
  });
});
