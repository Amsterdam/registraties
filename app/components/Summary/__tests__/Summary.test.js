import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-styled-components';
import { IntlProvider } from 'react-intl';

import messages from '../../../translations/nl.json';
import Summary from '..';

const intlProvider = new IntlProvider({ locale: 'nl', messages });
const { intl } = intlProvider.getChildContext();

const summaryData = {
  address: {
    label: {
      id: 'registraties.address',
    },
    value: ['FakeStreetName 229-X', ' ', '1000XX'],
  },
  public_space_id: {
    label: {
      id: 'registraties.public_space_id',
    },
    value: '0363300000004297',
  },
  number_identification_id: {
    label: {
      id: 'registraties.number_identification.id',
    },
    value: '0363200000201567',
  },
  accommodation_object_id: {
    label: {
      id: 'registraties.accommodation_object.id',
    },
    value: '0363010000740965',
  },
  house_id: {
    label: {
      id: 'registraties.house.id',
    },
    value: '0363100012070761',
  },
  cadastral_object_nr: {
    label: {
      id: 'registraties.cadastral_object.indication',
    },
    value: 'ASD99 K 01337 A 1337',
  },
  chamber_of_commerce_nr: {
    label: {
      id: 'registraties.chamber_of_commerce.nr',
    },
    value: '33006516',
  },
  RSIN: {
    label: {
      id: 'registraties.rsin',
    },
    value: '2562856',
  },
};

describe('Summary', () => {
  afterEach(cleanup);

  it('matches the snapshot', () => {
    const numSummaryItems = Object.keys(summaryData).length;
    const { container } = render(<Summary intl={intl} data={summaryData} />);

    expect(container.firstChild).toMatchSnapshot();
    expect(document.getElementsByTagName('dl')).toHaveLength(1);
    expect(document.getElementsByTagName('dd')).toHaveLength(numSummaryItems);
    expect(document.getElementsByTagName('dt')).toHaveLength(numSummaryItems);
  });

  it('should render null', () => {
    const { container, rerender, getByTestId } = render(<Summary intl={intl} />);

    expect(container.firstChild).toBeNull();

    rerender(<Summary intl={intl} data={{}} />);

    expect(getByTestId('progress-wrapper')).not.toBeNull();
  });
});
