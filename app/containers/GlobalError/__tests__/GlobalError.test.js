import React from 'react';
import { render } from 'react-testing-library';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import history from 'utils/history';
import { Provider } from 'react-redux';

import * as appActions from 'containers/App/actions';
import GlobalErrorContainer, { GlobalErrorComponent as GlobalError } from '..';
import messages from '../../../translations/nl.json';
import configureStore from '../../../configureStore';

const store = configureStore({}, history);
const intl = {
  formatDate: ({ id }) => id,
  formatMessage: obj => (obj ? obj.id : ''),
  formatNumber: ({ id }) => id,
  formatPlural: ({ id }) => id,
  formatRelative: ({ id }) => id,
  formatTime: ({ id }) => id,
  formatHTMLMessage: ({ id }) => id,
  now: () => Date.now,
};

const renderGlobalError = (props = {}) => (
  <Provider store={store}>
    <IntlProvider locale="nl" messages={messages}>
      <GlobalErrorContainer intl={intl} {...props} />
    </IntlProvider>
  </Provider>
);

describe('<GlobalError />', () => {
  const { container, rerender } = render(renderGlobalError());

  it('should render showing no error by default', () => {
    expect(container.firstChild).toBeNull();
  });

  it('should render showing an error when defined', () => {
    const props = {
      error: true,
      errorMessage: 'MOCK_ERROR',
    };

    rerender(renderGlobalError(props));

    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementsByTagName('button')).toHaveLength(1);
  });

  it('should close the error when the button is clicked', () => {
    const resetGlobalErrorSpy = jest.spyOn(appActions, 'resetGlobalError');
    const tree = mount(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <GlobalError />
        </IntlProvider>
      </Provider>,
    );

    const closeButton = tree.find('button').first();
    closeButton.simulate('click');

    expect(resetGlobalErrorSpy).toHaveBeenCalled();
  });

  it('should render a feedback button', () => {
    const props = {
      error: true,
      errorMessage: 'MOCK_ERROR',
      onClose: jest.fn(),
    };
    const renderedComponent = mount(renderGlobalError(props));
    expect(renderedComponent).toMatchSnapshot();

    renderedComponent.find('button').simulate('click');
    expect(props.onClose).toHaveBeenCalled();
    expect(renderedComponent).toMatchSnapshot();
  });
});
