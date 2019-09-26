import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import 'jest-styled-components';
import { ThemeProvider } from '@datapunt/asc-ui';
import { IntlProvider } from 'react-intl';
import history from 'utils/history';
import { Provider } from 'react-redux';
import { LOAD_DATA_SUCCESS } from 'containers/App/constants';

import messages from '../../../translations/nl.json';
import AccommodationObject from '..';
import * as styledComponents from '../styled';
import configureStore from '../../../configureStore';
const { store } = configureStore({}, history);

const intlProvider = new IntlProvider({ locale: 'nl', messages });
const { intl } = intlProvider.getChildContext();

const match = {
  params: {
    vboId: '0363010000740956',
  },
};

describe('AccommodationObject', () => {
  afterEach(cleanup);

  it('should render without problems', () => {
    expect(() => {
      const { container, rerender } = render(
        <ThemeProvider>
          <Provider store={store}>
            <IntlProvider locale="nl" messages={messages}>
              <AccommodationObject intl={intl} loadBAGData={() => {}} match={match} />
            </IntlProvider>
          </Provider>
        </ThemeProvider>,
      );

      expect(container.firstChild).toMatchSnapshot();

      rerender(
        <ThemeProvider>
          <Provider store={store}>
            <IntlProvider locale="nl" messages={messages}>
              <AccommodationObject intl={intl} loadBAGData={() => {}} match={match} status={LOAD_DATA_SUCCESS} />
            </IntlProvider>
          </Provider>
        </ThemeProvider>,
      );

      expect(container.firstChild).toMatchSnapshot();
    }).not.toThrow();
  });

  it('should not render section headings', () => {
    const { rerender, queryByTestId } = render(
      <ThemeProvider>
        <Provider store={store}>
          <IntlProvider locale="nl" messages={messages}>
            <AccommodationObject intl={intl} loadBAGData={() => {}} match={match} />
          </IntlProvider>
        </Provider>
      </ThemeProvider>,
    );

    expect(queryByTestId('accommodationObjectBAGHeader')).toBeNull();
    expect(queryByTestId('accommodationObjectBRKHeader')).toBeNull();

    rerender(
      <ThemeProvider>
        <Provider store={store}>
          <IntlProvider locale="nl" messages={messages}>
            <AccommodationObject
              intl={intl}
              loadBAGData={() => {}}
              match={match}
              status={LOAD_DATA_SUCCESS}
              summary={{ house_id: { value: '' } }}
            />
          </IntlProvider>
        </Provider>
      </ThemeProvider>,
    );

    expect(queryByTestId('accommodationObjectBAGHeader')).not.toBeNull();
    expect(queryByTestId('accommodationObjectBRKHeader')).toBeNull();

    rerender(
      <ThemeProvider>
        <Provider store={store}>
          <IntlProvider locale="nl" messages={messages}>
            <AccommodationObject
              intl={intl}
              loadBAGData={() => {}}
              match={match}
              status={LOAD_DATA_SUCCESS}
              summary={{ cadastral_object_nr: { value: '' } }}
            />
          </IntlProvider>
        </Provider>
      </ThemeProvider>,
    );

    expect(queryByTestId('accommodationObjectBAGHeader')).toBeNull();
    expect(queryByTestId('accommodationObjectBRKHeader')).not.toBeNull();
  });

  it('should call action that initiates data fetch', () => {
    const loadBAGData = jest.fn();
    const { vboId } = match.params;

    const { rerender } = render(
      <ThemeProvider>
        <Provider store={store}>
          <IntlProvider locale="nl" messages={messages}>
            <AccommodationObject intl={intl} loadBAGData={loadBAGData} match={match} />
          </IntlProvider>
        </Provider>
      </ThemeProvider>,
    );

    expect(loadBAGData).toHaveBeenCalledWith(expect.objectContaining({ vboId }));

    const ligId = '0363010000740959';

    rerender(
      <ThemeProvider>
        <Provider store={store}>
          <IntlProvider locale="nl" messages={messages}>
            <AccommodationObject intl={intl} loadBAGData={loadBAGData} match={{ params: { ligId } }} />
          </IntlProvider>
        </Provider>
      </ThemeProvider>,
    );

    expect(loadBAGData).toHaveBeenCalledWith(expect.objectContaining({ ligId }));

    const brkId = '0363010000740000';

    rerender(
      <ThemeProvider>
        <Provider store={store}>
          <IntlProvider locale="nl" messages={messages}>
            <AccommodationObject intl={intl} loadBAGData={loadBAGData} match={{ params: { brkId } }} />
          </IntlProvider>
        </Provider>
      </ThemeProvider>,
    );

    expect(loadBAGData).toHaveBeenCalledWith(expect.objectContaining({ brkId }));
  });

  it('should keep state', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Provider store={store}>
          <IntlProvider locale="nl" messages={messages}>
            <AccommodationObject intl={intl} loadBAGData={() => {}} match={match} status={LOAD_DATA_SUCCESS} />
          </IntlProvider>
        </Provider>
      </ThemeProvider>,
    );

    const textarea = document.getElementById('areaNotitie');
    let value = 'Here be some text in the area';
    fireEvent.change(textarea, { target: { value } });

    expect(getByTestId('accommodation-object-notitie').textContent).toBe(value);

    const input = document.getElementById('inputFilledInBy');
    value = 'Putting my name here';
    fireEvent.change(input, { target: { value } });

    expect(getByTestId('accommodation-object-filled-in-by').textContent).toBe(value);
  });
});

describe('styled components', () => {
  it('should match the snapshot', () => {
    const { Wrapper, Label, StelselpediaLink } = styledComponents;

    const { container, rerender } = render(<Wrapper />);

    expect(container.firstChild).toHaveStyleRule('display', 'flex');
    expect(container.firstChild).not.toHaveStyleRule('flex-direction');
    expect(container.firstChild).toHaveStyleRule('flex-direction', 'column', {
      media: 'screen and (max-width: 920px)',
    });

    rerender(<Label />);
    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild).toHaveStyleRule('display', 'block', {
      media: 'print',
    });

    rerender(<StelselpediaLink />);
    expect(container.firstChild).toMatchSnapshot();
    expect(container.firstChild).toHaveStyleRule('display', 'none', {
      media: 'print',
    });
  });
});
