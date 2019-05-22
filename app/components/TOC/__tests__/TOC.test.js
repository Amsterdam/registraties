import React from 'react';
import { render, cleanup, fireEvent, waitForDomChange } from 'react-testing-library';
import 'jest-styled-components';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from '@datapunt/asc-ui';

import messages from '../../../translations/nl.json';
import TOC from '..';

const intlProvider = new IntlProvider({ locale: 'nl', messages });
const { intl } = intlProvider.getChildContext();

const sectionData = [
  {
    id: 'registraties.public_space',
  },
  {
    id: 'registraties.residence',
  },
  {
    id: 'registraties.number_identification',
  },
  {
    id: 'registraties.accommodation_object',
  },
  {
    id: 'registraties.house',
  },
  {
    id: 'registraties.cadastral_object',
  },
  null,
  {
    id: 'registraties.non_natural_person',
  },
  null,
  {
    id: 'registraties.area',
  },
];

let container;
let rerender;
let queryByTestId;

describe('TOC', () => {
  beforeEach(() => {
    ({ container, rerender, queryByTestId } = render(
      <ThemeProvider>
        <TOC intl={intl} sections={sectionData} />
      </ThemeProvider>,
    ));
  });
  afterEach(cleanup);

  it('matches the snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('should filter out empty values', () => {
    const numNonEmptyItems = sectionData.filter(Boolean).length;

    expect(container.getElementsByTagName('li')).toHaveLength(numNonEmptyItems);
  });

  it('should not print anything', () => {
    const immediateChildren = container.childNodes;
    immediateChildren.forEach(child => {
      expect(child.classList).toContain('no-print');
    });
  });

  it('should render null', () => {
    rerender(
      <ThemeProvider>
        <TOC intl={intl} />
      </ThemeProvider>,
    );

    expect(container.firstChild).toBeNull();
    expect(queryByTestId('progress-wrapper')).toBeNull();

    rerender(
      <ThemeProvider>
        <TOC intl={intl} sections={[]} />
      </ThemeProvider>,
    );

    expect(container.firstChild).not.toBeNull();
    expect(queryByTestId('progress-wrapper')).not.toBeNull();
  });

  it('should keep active element state', async () => {
    const anchors = document.getElementsByTagName('a');
    const randomAnchor = anchors[Math.floor(Math.random() * anchors.length)];

    Array.from(anchors).forEach(anchor => {
      expect(anchor.classList).not.toContain('has-focus');
    });

    fireEvent(
      randomAnchor,
      new MouseEvent('click', {
        bubbles: true,
      }),
    );
    waitForDomChange({ container }).then(() => {
      Array.from(anchors).forEach(anchor => {
        if (anchor === randomAnchor) {
          expect(anchor.classList).toContain('has-focus');
        } else {
          expect(anchor.classList).not.toContain('has-focus');
        }
      });
    });
  });
});
