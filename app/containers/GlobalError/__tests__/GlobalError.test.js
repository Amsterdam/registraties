import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import history from 'utils/history';
import { Provider } from 'react-redux';

import { intl } from '../../../../internals/testing/test-utils';
import GlobalError, { GlobalErrorContainer } from '..';
import messages from '../messages';
import configureStore from '../../../configureStore';

const { store } = configureStore({}, history);

describe('containers/GlobalError', () => {
  afterEach(cleanup);

  const intlObj = intl({ messages });

  it('should render showing no error by default', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <GlobalError />
        </IntlProvider>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render showing an error when defined', () => {
    const props = {
      error: true,
      errorMessage: 'MOCK_ERROR',
      intl: intlObj,
    };
    const { container } = render(<GlobalErrorContainer {...props} errorMessage="unauthorized" />);
    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild.classList.contains('no-print')).toEqual(true);
  });

  it('should capture click on close button', () => {
    const onClose = jest.fn();
    const props = {
      error: true,
      errorMessage: 'MOCK_ERROR',
      onClose,
      intl: intlObj,
    };

    render(<GlobalErrorContainer {...props} errorMessage="unauthorized" />);

    const button = document.getElementsByTagName('button')[0];
    fireEvent.click(button);

    expect(onClose).toHaveBeenCalled();
  });
});
