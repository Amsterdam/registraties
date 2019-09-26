import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from 'react-testing-library';
import messages from '../../../translations/nl.json';

import DocumentTitle from '..';

describe('DocumentTitle', () => {
  it('should set document title', () => {
    render(
      <IntlProvider locale="nl" messages={messages}>
        <DocumentTitle title="Capitalized with spaces" />
      </IntlProvider>,
    );
    expect(document.title).toBe('Capitalized with spaces');
  });

  it('should reset document title when unmounted', () => {
    const defaultTitle = 'Registraties';
    expect(document.title).toBe(defaultTitle);
    const { unmount } = render(
      <IntlProvider locale="nl" messages={messages}>
        <DocumentTitle title="New title" />
      </IntlProvider>,
    );
    expect(document.title).not.toBe(defaultTitle);
    unmount();
    expect(document.title).toBe(defaultTitle);
  });
});
