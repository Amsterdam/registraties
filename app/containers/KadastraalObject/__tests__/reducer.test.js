import { LOAD_DATA_PENDING } from 'containers/App/constants';
import reducer, { initialState } from '../reducer';

import { LOAD_DATA, LOAD_DATA_FAILED, LOAD_DATA_SUCCESS, LOAD_DATA_NO_RESULTS } from '../constants';

describe('containers/KadastraalObject/reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('it should handle LOAD_DATA_PENDING', () => {
    const actionLoadDataPending = {
      type: LOAD_DATA_PENDING,
    };

    const prevState = { ...initialState, data: { foo: 'bar' } };

    expect(reducer(prevState, actionLoadDataPending)).toEqual(initialState);
  });

  it('it should handle LOAD_DATA', () => {
    const adresseerbaarObjectId = 'foobarbazqux';
    const payload = { adresseerbaarObjectId };
    const actionLoadData = {
      type: LOAD_DATA,
      payload,
    };

    const prevState = { ...initialState, data: { foo: 'bar' } };

    expect(reducer(initialState, actionLoadData)).toEqual({ ...initialState, adresseerbaarObjectId });
    expect(reducer(prevState, actionLoadData)).toEqual({ ...initialState, adresseerbaarObjectId });
  });

  it('it should handle LOAD_DATA_SUCCESS', () => {
    const data = {
      count: 1,
      results: [
        {
          id: 'NL.KAD.OnroerendeZaak.11487294710107',
          aanduiding: 'ASD07 K 01739 A 0915',
          objectnummer: '1739',
          indexletter: 'A',
          indexnummer: 107,
          cultuurcode_bebouwd: {
            code: '12',
            omschrijving: 'Wonen (appartement)',
          },
          status_code: 'B',
          toestandsdatum: '2019-04-12',
          voorlopige_kadastrale_grens: false,
          verblijfsobjecten: {
            count: 1,
            href:
              'https://acc.api.data.amsterdam.nl/bag/verblijfsobject/?kadastrale_objecten__id=NL.KAD.OnroerendeZaak.11487294710107',
          },
          _adressen: {
            href:
              'https://acc.api.data.amsterdam.nl/bag/nummeraanduiding/?kadastraalobject=NL.KAD.OnroerendeZaak.11487294710107',
          },
          rechten: [],
          dataset: 'brk',
        },
      ],
    };
    const payload = data;
    const actionLoadDataSuccess = {
      type: LOAD_DATA_SUCCESS,
      payload,
    };

    const prevState = { ...initialState, data: { foo: 'bar' } };

    expect(reducer(initialState, actionLoadDataSuccess)).toEqual({ ...initialState, data });
    expect(reducer(prevState, actionLoadDataSuccess)).toEqual({ ...initialState, data });
  });

  it('it should handle LOAD_DATA_FAILED', () => {
    const error = 'Something very bad happened';
    const payload = error;
    const actionLoadDataFailed = {
      type: LOAD_DATA_FAILED,
      payload,
    };
    const resultState = {
      data: null,
      error: true,
      errorMessage: payload,
    };

    expect(reducer(initialState, actionLoadDataFailed)).toEqual({ ...initialState, ...resultState });
  });

  it('it should handle LOAD_DATA_NO_RESULTS', () => {
    const actionLoadDataNoResults = {
      type: LOAD_DATA_NO_RESULTS,
    };
    const resultState = {
      data: null,
      error: false,
      errorMessage: '',
    };
    const prevState = { ...initialState, data: { foo: 'bar' } };

    expect(reducer(initialState, actionLoadDataNoResults)).toEqual({ ...initialState, ...resultState });
    expect(reducer(prevState, actionLoadDataNoResults)).toEqual({ ...initialState, ...resultState });
  });
});
