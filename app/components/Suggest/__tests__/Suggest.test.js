import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import 'jest-styled-components';
import { ThemeProvider } from '@datapunt/asc-ui';
import Suggest from '..';

const items = {
  Adressen: [
    {
      name: 'FakeStreet 999X',
      vboId: null,
      ligId: null,
      brkId: '0363010000740956',
    },
    {
      name: 'FakeStreet 999Y',
      vboId: null,
      ligId: '0363010000740956',
      brkId: null,
    },
    {
      name: 'FakeStreet 999Z',
      vboId: '0363010000740958',
      ligId: null,
      brkId: null,
    },
  ],
};

describe('Suggest', () => {
  afterEach(cleanup);

  it('matches the snapshot', () => {
    const { container } = render(
      <ThemeProvider>
        <Suggest onSelect={() => {}} items={items} />
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render null', () => {
    const { container, rerender } = render(
      <ThemeProvider>
        <Suggest onSelect={() => {}} />
      </ThemeProvider>,
    );

    expect(container.firstChild).toBeNull();

    rerender(
      <ThemeProvider>
        <Suggest onSelect={() => {}} items={{}} />
      </ThemeProvider>,
    );

    expect(container.firstChild).toBeNull();
  });

  it('should render category names', () => {
    const { queryByText } = render(
      <ThemeProvider>
        <Suggest onSelect={() => {}} items={{ Adressen: [], 'Kadastrale Objecten': [] }} />
      </ThemeProvider>,
    );

    expect(queryByText('Adressen')).toBeInstanceOf(HTMLElement);
    expect(queryByText('Kadastrale Objecten')).toBeInstanceOf(HTMLElement);
  });

  it('sets data attributes', () => {
    const numItems = Object.keys(items.Adressen).length;

    const { container } = render(
      <ThemeProvider>
        <Suggest onSelect={() => {}} items={items} />
      </ThemeProvider>,
    );

    const anchors = container.getElementsByTagName('a');

    expect(anchors).toHaveLength(numItems);
    expect(anchors[0].dataset.brkId).not.toBeUndefined();
    expect(anchors[0].dataset.vboId).not.toBeUndefined();
  });

  it('should call onSelect handler', () => {
    const onSelect = jest.fn();

    const { getByText } = render(
      <ThemeProvider>
        <Suggest onSelect={onSelect} items={items} />
      </ThemeProvider>,
    );

    fireEvent(
      getByText('FakeStreet 999Y'),
      new MouseEvent('click', {
        bubbles: true,
      }),
    );

    expect(onSelect).toHaveBeenCalled();
  });
});
