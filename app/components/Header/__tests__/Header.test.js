import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from '@datapunt/asc-ui';
import 'jest-styled-components';
import Header from '..';
import messages from '../../../translations/nl.json';

const intlProvider = new IntlProvider({ locale: 'nl', messages });
const { intl } = intlProvider.getChildContext();

describe('Header', () => {
  afterEach(cleanup);

  it('matches the snapshot', () => {
    const { container, rerender } = render(
      <ThemeProvider>
        <Header intl={intl} />
      </ThemeProvider>,
    );

    expect(container).toMatchSnapshot();

    rerender(
      <ThemeProvider>
        <Header intl={intl} isAuthenticated />
      </ThemeProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render log in buttons', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Header intl={intl} />
      </ThemeProvider>,
    );

    expect(getByText('Inloggen')).not.toBeUndefined();
    expect(getByText('Inloggen ADW')).not.toBeUndefined();
  });

  it('should render a log out button', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Header intl={intl} isAuthenticated />
      </ThemeProvider>,
    );

    expect(getByText('Uitloggen')).not.toBeUndefined();
  });

  it('should call the onLoginLogoutButtonClick handler', () => {
    const onLoginLogoutButtonClick = jest.fn();

    const { getByText } = render(
      <ThemeProvider>
        <Header intl={intl} onLoginLogoutButtonClick={onLoginLogoutButtonClick} />
      </ThemeProvider>,
    );

    fireEvent(
      getByText('Inloggen'),
      new MouseEvent('click', {
        bubbles: true,
      }),
    );

    expect(onLoginLogoutButtonClick).toHaveBeenCalledWith(expect.anything(), 'datapunt');

    fireEvent(
      getByText('Inloggen ADW'),
      new MouseEvent('click', {
        bubbles: true,
      }),
    );

    expect(onLoginLogoutButtonClick).toHaveBeenCalledWith(expect.anything(), 'grip');
  });
});
