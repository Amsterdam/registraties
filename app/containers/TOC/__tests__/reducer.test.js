import { LOAD_DATA_SUCCESS as LOAD_KADASTRAAL_OBJECT_DATA_SUCCESS } from 'containers/KadastraalObject/constants';
import { LOAD_DATA_SUCCESS as LOAD_KADASTRAAL_SUBJECT_NNP_DATA_SUCCESS } from 'containers/KadastraalSubjectNNP/constants';
import { LOAD_DATA_SUCCESS as LOAD_KADASTRAAL_SUBJECT_NP_DATA_SUCCESS } from 'containers/KadastraalSubjectNP/constants';
import { LOAD_DATA_SUCCESS as LOAD_NUMMERAANDUIDING_DATA_SUCCESS } from 'containers/Nummeraanduiding/constants';
import { LOAD_DATA_SUCCESS as LOAD_OPENBARE_RUIMTE_DATA_SUCCESS } from 'containers/OpenbareRuimte/constants';
import { LOAD_DATA_SUCCESS as LOAD_PAND_DATA_SUCCESS } from 'containers/Pand/constants';
import { LOAD_DATA_SUCCESS as LOAD_VERBLIJFSOBJECT_DATA_SUCCESS } from 'containers/Verblijfsobject/constants';
import { LOAD_DATA_SUCCESS as LOAD_VESTIGING_DATA_SUCCESS } from 'containers/Vestiging/constants';
import { LOAD_DATA_SUCCESS as LOAD_WOONPLAATS_DATA_SUCCESS } from 'containers/Woonplaats/constants';
import { OBJECTS, LOAD_BAG_DATA } from 'containers/App/constants';

import reducer, { initialState } from '../reducer';

describe('containers/TOC/reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle LOAD_BAG_DATA', () => {
    const action = {
      type: LOAD_BAG_DATA,
    };

    const prevState = { ...initialState, toc: ['foo', 'bar'] };

    expect(reducer(prevState, action)).toEqual(initialState);
  });

  it('should handle LOAD_PAND_DATA_SUCCESS', () => {
    const action = {
      type: LOAD_PAND_DATA_SUCCESS,
    };

    const prevState = { ...initialState, toc: ['foo', 'bar'] };
    const state = reducer(prevState, action);

    expect(state.toc[5]).toEqual(OBJECTS.PAND.NAME);
  });

  it('should handle LOAD_NUMMERAANDUIDING_DATA_SUCCESS', () => {
    const action = {
      type: LOAD_NUMMERAANDUIDING_DATA_SUCCESS,
    };

    const prevState = { ...initialState, toc: ['foo', 'bar'] };
    const state = reducer(prevState, action);

    expect(state.toc[1]).toEqual(OBJECTS.NUMMERAANDUIDING.NAME);
    expect(state.toc[3]).toEqual(OBJECTS.GEBIED.NAME);
  });

  it('should handle LOAD_KADASTRAAL_OBJECT_DATA_SUCCESS', () => {
    const action = {
      type: LOAD_KADASTRAAL_OBJECT_DATA_SUCCESS,
    };

    const prevState = { ...initialState, toc: ['foo', 'bar'] };
    const state = reducer(prevState, action);

    expect(state.toc[6]).toEqual(OBJECTS.KADASTRAAL_OBJECT.NAME);
  });

  it('should handle LOAD_KADASTRAAL_SUBJECT_NP_DATA_SUCCESS', () => {
    const action = {
      type: LOAD_KADASTRAAL_SUBJECT_NP_DATA_SUCCESS,
    };

    const prevState = { ...initialState, toc: ['foo', 'bar'] };
    const state = reducer(prevState, action);

    expect(state.toc[7]).toEqual(OBJECTS.KADASTRAAL_SUBJECT_NP.NAME);
  });

  it('should handle LOAD_KADASTRAAL_SUBJECT_NNP_DATA_SUCCESS', () => {
    const action = {
      type: LOAD_KADASTRAAL_SUBJECT_NNP_DATA_SUCCESS,
    };

    const prevState = { ...initialState, toc: ['foo', 'bar'] };
    const state = reducer(prevState, action);

    expect(state.toc[8]).toEqual(OBJECTS.KADASTRAAL_SUBJECT_NNP.NAME);
  });

  it('should handle LOAD_VERBLIJFSOBJECT_DATA_SUCCESS', () => {
    const action = {
      type: LOAD_VERBLIJFSOBJECT_DATA_SUCCESS,
    };

    const prevState = { ...initialState, toc: ['foo', 'bar'] };
    const state = reducer(prevState, action);

    expect(state.toc[4]).toEqual(OBJECTS.VERBLIJFSOBJECT.NAME);
  });

  it('should handle LOAD_VESTIGING_DATA_SUCCESS', () => {
    const action = {
      type: LOAD_VESTIGING_DATA_SUCCESS,
    };

    const prevState = { ...initialState, toc: ['foo', 'bar'] };
    const state = reducer(prevState, action);

    expect(state.toc[9]).toEqual(OBJECTS.VESTIGING.NAME);
  });

  it('should handle LOAD_OPENBARE_RUIMTE_DATA_SUCCESS', () => {
    const action = {
      type: LOAD_OPENBARE_RUIMTE_DATA_SUCCESS,
    };

    const prevState = { ...initialState, toc: ['foo', 'bar'] };
    const state = reducer(prevState, action);

    expect(state.toc[2]).toEqual(OBJECTS.OPENBARE_RUIMTE.NAME);
  });

  it('should handle LOAD_WOONPLAATS_DATA_SUCCESS', () => {
    const action = {
      type: LOAD_WOONPLAATS_DATA_SUCCESS,
    };

    const prevState = { ...initialState, toc: ['foo', 'bar'] };
    const state = reducer(prevState, action);

    expect(state.toc[0]).toEqual(OBJECTS.WOONPLAATS.NAME);
  });
});
