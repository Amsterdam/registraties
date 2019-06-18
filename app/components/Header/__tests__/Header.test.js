import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from '@datapunt/asc-ui';
import 'jest-styled-components';
import messages from '../../../translations/nl.json';

const intlProvider = new IntlProvider({ locale: 'nl', messages });
const { intl } = intlProvider.getChildContext();

describe('Header', () => {
  let Header;
  const OLD_ENV = process.env;

  beforeEach(() => {
    // eslint-disable-next-line
    Header = require('../index.js').default;
  });

  beforeAll(() => {
    process.env.HOST = 'localhost';
    process.env.PORT = 8080;
    process.env.HTTPS = true;
  });

  afterAll(() => {
    delete process.env.HTTPS;
    delete process.env.PORT;
    delete process.env.HOST;

    process.env = { ...OLD_ENV };
  });

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
  });
});
