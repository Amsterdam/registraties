import React from 'react';
import { render } from 'react-testing-library';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import history from 'utils/history';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import 'jest-styled-components';

import * as auth from 'shared/services/auth/auth';

import AppContainer, { App } from '..';
import GlobalStyles from '../../../global-styles';
import messages from '../../../translations/nl.json';
import configureStore from '../../../configureStore';

const { store } = configureStore({}, history);

jest.mock('shared/services/auth/auth');

describe('containers/App', () => {
  it('should get user credentials on mount', () => {
    const showError = jest.fn();
    const onAuthenticateUser = jest.fn();
    const credentials = { foo: 'bar', baz: null };
    const authenticateSpy = jest.spyOn(auth, 'authenticate').mockImplementation(() => credentials);
    const isAuthenticatedSpy = jest
      .spyOn(auth, 'isAuthenticated')
      .mockImplementationOnce(() => true)
      .mockImplementationOnce(() => true)
      .mockImplementationOnce(() => false);

    const { rerender } = render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <IntlProvider locale="nl" messages={messages}>
            <App onAuthenticateUser={onAuthenticateUser} showError={showError} />
          </IntlProvider>
        </ConnectedRouter>
      </Provider>,
    );

    expect(authenticateSpy).toHaveBeenCalled();
    expect(onAuthenticateUser).toHaveBeenCalledWith(credentials);
    expect(isAuthenticatedSpy).toHaveBeenCalled();
    expect(isAuthenticatedSpy).toHaveReturnedWith(true);
    expect(showError).not.toHaveBeenCalled();

    rerender(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <IntlProvider locale="nl" messages={messages}>
            <App onAuthenticateUser={onAuthenticateUser} showError={showError} />
          </IntlProvider>
        </ConnectedRouter>
      </Provider>,
    );
    expect(showError).toHaveBeenCalledWith('unauthorized');
  });

  it('should render some routes', () => {
    const tree = shallow(<App onAuthenticateUser={() => {}} showError={() => {}} />);

    expect(tree.find(Route)).not.toHaveLength(0);
  });

  it('should render UI components', () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <IntlProvider locale="nl" messages={messages}>
            <AppContainer />
          </IntlProvider>
        </ConnectedRouter>
      </Provider>,
    );

    expect(queryByTestId('site-header')).not.toBeNull();
    expect(queryByTestId('site-footer')).not.toBeNull();
    expect(queryByTestId('search-form')).not.toBeNull();
    expect(queryByTestId('search-foldout')).toHaveStyleRule('display', 'block');
  });

  it('should render global styles', () => {
    const tree = shallow(<App onAuthenticateUser={() => {}} showError={() => {}} />);

    expect(tree.find(GlobalStyles)).not.toHaveLength(0);
  });
});
