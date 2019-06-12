import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import history from 'utils/history';
import { Provider } from 'react-redux';
import json2csv from 'json2csv';

import { isArrayOfArrays } from 'utils';
import { OBJECTS } from 'containers/App/constants';
import DownloadLink from 'components/DownloadLink';

import { intl } from '../../../../internals/testing/test-utils';
import { CSVDownloadContainer, getData, plainTextMimetype } from '..';
import messages from '../../../translations/nl.json';
import configureStore from '../../../configureStore';
import nextProps from './nextProps.json';
import exportData from './exportData.json';

const store = configureStore({}, history);
const { getDerivedStateFromProps, getParseConfig } = CSVDownloadContainer;

jest.mock('json2csv');

describe('containers/CSVDownload', () => {
  it('should format data into a parseable structure', () => {
    const obj1 = {
      key: 'foo',
      formattedValue: 'Lorem ipsum',
    };

    const obj2 = {
      key: 'bar',
      formattedValue: 'Dolor sit amet',
    };

    const obj3 = {
      key: 'baz',
      formattedValue: 345,
    };

    const plain = [obj1, obj2, obj3];
    const expectedPlain = {
      foo: 'Lorem ipsum',
      bar: 'Dolor sit amet',
      baz: 345,
    };
    expect(getData(plain)).toEqual(expectedPlain);

    const nested = [
      {
        key: 'arc_170',
        formattedValue: [obj1, obj2, obj3],
      },
      {
        key: 'y_wing',
        formattedValue: [obj1, obj2],
      },
    ];
    const expectedNested = {
      arc_170: { foo: 'Lorem ipsum', bar: 'Dolor sit amet', baz: 345 },
      y_wing: { foo: 'Lorem ipsum', bar: 'Dolor sit amet' },
    };
    expect(getData(nested)).toEqual(expectedNested);

    const deeplyNested = [
      {
        key: 'arc_170',
        formattedValue: [[obj1, obj2, obj3], [obj3, obj3], [obj1, obj2]],
      },
    ];
    const expectedDeeplyNested = {
      arc_170_1: { foo: 'Lorem ipsum', bar: 'Dolor sit amet', baz: 345 },
      arc_170_2: { baz: 345 },
      arc_170_3: { foo: 'Lorem ipsum', bar: 'Dolor sit amet' },
    };

    expect(getData(deeplyNested)).toEqual(expectedDeeplyNested);
  });

  describe('getDerivedStateFromProps', () => {
    it('should return initial state', () => {
      const prevState = { data: new Map([['date', Date.now()]]) };

      const derivedState = getDerivedStateFromProps({}, prevState);
      expect(derivedState).toEqual(prevState);
    });

    it('should return formatted values', () => {
      const prevState = { data: new Map([['date', Date.now()]]) };
      const keysWithSingleEntries = Object.keys(nextProps).filter(
        key => nextProps[key] !== null && !isArrayOfArrays(nextProps[key]),
      );
      const keysWithMultipleEntries = Object.keys(nextProps).filter(
        key => nextProps[key] !== null && isArrayOfArrays(nextProps[key]),
      );

      const derivedState = getDerivedStateFromProps(nextProps, prevState);

      // contains one entry for each values that does not consist of a list of lists
      keysWithSingleEntries.forEach(key => {
        const { ABBR } = OBJECTS[key];
        const hasKey = derivedState.data.has(ABBR);

        expect(hasKey).toEqual(true);
        expect(derivedState.data.get(ABBR)).toEqual(getData(nextProps[key]));
      });

      // contains multiple, numbered entries for each value that is a list of lists
      keysWithMultipleEntries.forEach(key => {
        const { ABBR } = OBJECTS[key];
        const entries = nextProps[key];

        entries.forEach((entry, index) => {
          const indexedKey = `${ABBR}_${index + 1}`;
          const hasKey = derivedState.data.has(indexedKey);

          expect(hasKey).toEqual(true);
          expect(derivedState.data.get(indexedKey)).toEqual(getData(nextProps[key][index]));
        });
      });
    });
  });

  describe('instance', () => {
    const now = jest.fn(() => Date.now());

    const intlObj = intl({ messages, now });

    const data = {
      someField: 'Foo bar',
      anotherField: 'Baz qux',
    };

    const tree = mount(
      <Provider store={store}>
        <IntlProvider locale="nl" messages={messages}>
          <CSVDownloadContainer {...nextProps} intl={intlObj} data={data} />
        </IntlProvider>
      </Provider>,
    );
    const CSVDownloadComponent = tree.find(CSVDownloadContainer);

    it('should return an object with keys `fields` and `unwind` from getParseConfig', () => {
      const parseConfig = getParseConfig(exportData);
      const expectedConfig = {
        fields: [
          'date',
          'opr.openbare_ruimte_identificatie',
          'opr.type',
          'opr.naam',
          'num.nummeraanduidingidentificatie',
          'num.begin_geldigheid',
          'num.einde_geldigheid',
          'num.adres',
          'num.postcode',
          'num.huisnummer',
          'num.type',
          'num.hoofdadres',
          'brko_1.id',
          'brko_1.aanduiding',
          'brko_1.objectnummer',
          'brko_1.koopsom',
          'brko_1.koopjaar',
          'brks_nnp_1.rsin',
          'brks_nnp_1.kvknummer',
          'brks_nnp_1.rechtsvorm',
          'brks_nnp_1.statutaire_naam',
          'ves_1.vestigingsnummer',
          'ves_1.naam',
          'ves_1.datum_aanvang',
          'ves_1.postadres',
          'ves_1.bezoekadres',
          'ves_1.activiteiten_1.activiteitsomschrijving',
          'ves_1.activiteiten_1.sbi_code',
          'ves_1.activiteiten_1.sbi_omschrijving',
          'ves_1.activiteiten_2.sbi_code',
          'ves_1.activiteiten_2.sbi_omschrijving',
          'ves_1.activiteiten_3.sbi_code',
          'ves_1.activiteiten_3.sbi_omschrijving',
          'ves_1.kvk_nummer',
          'ves_2.vestigingsnummer',
          'ves_2.naam',
          'ves_2.datum_aanvang',
          'ves_2.postadres',
          'ves_2.bezoekadres',
          'ves_2.activiteiten.activiteitsomschrijving',
          'ves_2.activiteiten.sbi_code',
          'ves_2.activiteiten.sbi_omschrijving',
          'ves_2.kvk_nummer',
          'geb.buurt',
          'geb.stadsdeel',
          'geb.wijk',
          'notitie',
          'filledInBy',
        ],
        unwind: ['ves_1.activiteiten_1', 'ves_1.activiteiten_2', 'ves_1.activiteiten_3', 'ves_2.activiteiten'],
      };

      expect(parseConfig).toEqual(expectedConfig);
    });

    it('should get an object from getMergedData', () => {
      const state = CSVDownloadComponent.state();
      const mergedData = CSVDownloadComponent.instance().getMergedData();
      const derivedStateKeys = [...getDerivedStateFromProps(nextProps, state).data.keys()];
      const mergedDataKeys = Object.keys(mergedData);
      const dataKeys = Object.keys(data);

      [...derivedStateKeys, ...dataKeys].forEach(key => {
        expect(mergedDataKeys.includes(key)).toEqual(true);
      });
    });

    it('should call parse', () => {
      const parseSpy = jest.spyOn(json2csv, 'parse');
      const mergedData = CSVDownloadComponent.instance().getMergedData();
      const parseConfig = getParseConfig(mergedData);
      CSVDownloadComponent.instance().getParsedData();

      expect(parseSpy).toHaveBeenCalledWith(mergedData, parseConfig);
    });

    it('should append parsed data to anchor href attribute', () => {
      const csvData = 'foo,bar,baz';
      jest.spyOn(json2csv, 'parse').mockImplementation(() => csvData);
      const link = tree.find(DownloadLink);

      expect(link.getDOMNode().getAttribute('href')).toBeNull();

      link.simulate('click');

      expect(link.getDOMNode().getAttribute('href')).toEqual(`${plainTextMimetype},${csvData}`);
    });

    it('should create a Blob', () => {
      const csvData = 'foo,bar,baz';
      const persist = jest.fn();
      const preventDefault = jest.fn();
      const event = { target: { value: 'foo' }, persist, preventDefault };
      const link = tree.find(DownloadLink);
      const msSaveOrOpenBlob = jest.fn();
      const blob = new Blob([csvData], { type: `${plainTextMimetype};` });

      jest.spyOn(json2csv, 'parse').mockImplementation(() => csvData);

      Object.defineProperty(window.navigator, 'msSaveBlob', {
        configurable: true,
        get() {
          return true;
        },
      });

      Object.defineProperty(window.navigator, 'msSaveOrOpenBlob', {
        configurable: true,
        get() {
          return msSaveOrOpenBlob;
        },
      });

      link.simulate('click', event);

      expect(persist).toHaveBeenCalled();
      expect(preventDefault).toHaveBeenCalled();
      expect(msSaveOrOpenBlob).toHaveBeenCalledWith(blob, expect.any(String));
    });
  });
});
