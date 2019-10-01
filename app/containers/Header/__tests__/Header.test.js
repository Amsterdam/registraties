import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import history from 'utils/history';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@datapunt/asc-ui';

import { isAuthenticated } from 'shared/services/auth/auth';
import HeaderContainer, { HeaderContainerComponent } from '..';
import messages from '../../../translations/nl.json';
import configureStore from '../../../configureStore';

const store = configureStore({}, history);

jest.mock('shared/services/auth/auth');

describe('containers/Header', () => {
  let props;

  beforeEach(() => {
    props = {
      userName: 'user',
      onLogin: jest.fn(),
      onLogout: jest.fn(),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should have props from structured selector', () => {
    const tree = mount(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <ThemeProvider>
            <HeaderContainer {...props} />
          </ThemeProvider>
        </IntlProvider>
      </Provider>,
    );

    const componentProps = tree.find(HeaderContainerComponent).props();
    const propNames = Object.keys(componentProps);

    expect(propNames.includes('onLogin')).toEqual(true);
    expect(propNames.includes('onLogout')).toEqual(true);
  });

  it('should render correctly when authenticated', () => {
    isAuthenticated.mockImplementation(() => true);

    const { rerender, queryByText } = render(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <ThemeProvider>
            <HeaderContainer {...props} />
          </ThemeProvider>
        </IntlProvider>
      </Provider>,
    );
    expect(queryByText('Uitloggen')).not.toBeNull();
    expect(queryByText('Inloggen')).toBeNull();

    isAuthenticated.mockImplementation(() => false);

    rerender(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <ThemeProvider>
            <HeaderContainer {...props} />
          </ThemeProvider>
        </IntlProvider>
      </Provider>,
    );
    expect(queryByText('Uitloggen')).toBeNull();
    expect(queryByText('Inloggen')).not.toBeNull();
  });

  describe('onLoginLogoutButtonClick', () => {
    it('should login when not authenticated', () => {
      isAuthenticated.mockImplementation(() => false);

      render(
        <Provider store={store}>
          <IntlProvider locale="nl" messages={messages}>
            <ThemeProvider>
              <HeaderContainerComponent {...props} />
            </ThemeProvider>
          </IntlProvider>
        </Provider>,
      );

      const button = document.getElementsByTagName('button')[0];

      fireEvent.click(button);

      expect(props.onLogin).toHaveBeenCalled();
    });

    it('should logout when authenticated', () => {
      isAuthenticated.mockImplementation(() => true);
      render(
        <Provider store={store}>
          <IntlProvider locale="nl" messages={messages}>
            <ThemeProvider>
              <HeaderContainerComponent {...props} />
            </ThemeProvider>
          </IntlProvider>
        </Provider>,
      );

      const button = document.getElementsByTagName('button')[0];

      fireEvent.click(button);

      expect(props.onLogout).toHaveBeenCalled();
    });
  });
});
