import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-styled-components';
import { IntlProvider } from 'react-intl';

import { SectionComponent as Section } from '..';
import messages from '../../../translations/nl.json';

const intlProvider = new IntlProvider({ locale: 'nl', messages });
const { intl } = intlProvider.getChildContext();

describe('Section', () => {
  afterEach(cleanup);

  it('matches the snapshot', () => {
    const { container } = render(<Section name="Qux baz" intl={intl} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render an external link', () => {
    const { container, rerender } = render(<Section name="Qux baz" intl={intl} />);

    const anchors = container.getElementsByTagName('a');
    expect(anchors).toHaveLength(0);

    rerender(<Section name="Qux baz" href="https://www.amsterdam.nl" intl={intl} />);

    expect(anchors).toHaveLength(1);
    expect(anchors[0].getAttribute('target')).toBe('_blank');
    expect(anchors[0].getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('should render a loading indicator', () => {
    const { rerender, queryByTestId } = render(<Section name="Bar bar baz" intl={intl} />);

    expect(queryByTestId('progress-wrapper')).not.toBeNull();

    rerender(<Section name="Bar bar baz" intl={intl} data={null} />);

    expect(queryByTestId('progress-wrapper')).toBeNull();
  });

  it('should not render the title when there is no data', () => {
    // selectors return 'undefined' when the app saga didn't retrieve the data yet. After retrieval, when the response is empty,
    // the saga returns 'null'
    const { rerender, queryByText } = render(<Section name="Foo bar baz" intl={intl} />);

    expect(queryByText('Foo bar baz')).not.toBeNull();

    rerender(<Section name="Foo bar baz" intl={intl} data={null} />);

    expect(queryByText('Foo bar baz')).toBeNull();
  });

  it('should render section contents', () => {
    const data = [
      {
        type: 'string',
        key: 'pandidentificatie',
        formattedKey: 'Pandidentificatie',
        value: '0363100012096240',
        formattedValue: '0363100012096240',
      },
      {
        type: 'object',
        key: 'status',
        formattedKey: 'Status',
        value: {
          code: '31',
          omschrijving: 'Pand in gebruik',
        },
        formattedValue: 'Pand in gebruik',
      },
      {
        type: 'string',
        key: 'oorspronkelijk_bouwjaar',
        formattedKey: 'Oorspronkelijk bouwjaar',
        value: '1921',
        formattedValue: '1921',
      },
      {
        type: 'boolean',
        key: 'hoogste_bouwlaag',
        formattedKey: 'Hoogste bouwlaag',
        value: null,
        formattedValue: 'n.b.',
      },
      {
        type: 'boolean',
        key: 'laagste_bouwlaag',
        formattedKey: 'Laagste bouwlaag',
        value: null,
        formattedValue: 'n.b.',
      },
      {
        type: 'number',
        key: 'verblijfsobjecten',
        formattedKey: {
          id: 'registraties.amount_of',
        },
        value: {
          count: 2,
          href: 'https://acc.api.data.amsterdam.nl/bag/verblijfsobject/?panden__id=0363100012096240',
        },
        formattedValue: 2,
      },
    ];
    const numValues = data.length;

    const { container } = render(
      <IntlProvider locale="nl" messages={messages}>
        <Section name="Foo bar baz" intl={intl} data={data} />
      </IntlProvider>,
    );

    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementsByTagName('li')).toHaveLength(numValues);
  });
});
