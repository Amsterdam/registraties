import React from 'react';
import { mount } from 'enzyme';
import { FormattedMessage, IntlProvider } from 'react-intl';

import { intl } from '../../../../internals/testing/test-utils';
import { scope } from '../../../i18n';
import messages from '../../../translations/nl.json';

import NotFound from '..';

describe('<NotFound />', () => {
  it('should render the Page Not Found text', () => {
    const intlObj = intl({ messages });
    const renderedComponent = mount(
      <IntlProvider locale="nl" messages={messages}>
        <NotFound intl={intlObj} />
      </IntlProvider>,
    );
    expect(
      renderedComponent.contains(
        <h1>
          <FormattedMessage id={`${scope}.page_not_found`} />
        </h1>,
      ),
    ).toBe(true);
  });
});
