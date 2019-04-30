import { fromJS } from 'immutable';

import {
  LOAD_BAG_DATA,
  LOAD_KADASTER_OBJECT_DATA_FAILED,
  LOAD_KADASTER_OBJECT_DATA_SUCCESS,
  LOAD_KADASTER_OBJECT_DATA,
  LOAD_KADASTER_SUBJECT_DATA_FAILED,
  LOAD_KADASTER_SUBJECT_DATA_SUCCESS,
  LOAD_KADASTER_SUBJECT_DATA,
  LOAD_NUMMERAANDUIDING_DATA_FAILED,
  LOAD_NUMMERAANDUIDING_DATA_SUCCESS,
  LOAD_NUMMERAANDUIDING_DATA,
  LOAD_OPENBARE_RUIMTE_DATA_FAILED,
  LOAD_OPENBARE_RUIMTE_DATA_SUCCESS,
  LOAD_OPENBARE_RUIMTE_DATA,
  LOAD_PAND_DATA_FAILED,
  LOAD_PAND_DATA_SUCCESS,
  LOAD_PAND_DATA,
  LOAD_VERBLIJFSOBJECT_DATA_FAILED,
  LOAD_VERBLIJFSOBJECT_DATA_SUCCESS,
  LOAD_VERBLIJFSOBJECT_DATA,
  FETCHING_KADASTER_OBJECT_DATA,
  LOAD_KADASTER_OBJECT_DATA_NO_RESULTS,
  LOAD_HR_DATA,
  LOAD_HR_DATA_SUCCESS,
  LOAD_HR_DATA_FAILED,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  loading: false,
  error: false,
});

export const bagReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BAG_DATA:
      return state
        .set('adresseerbaarObjectId', action.payload.adresseerbaarObjectId)
        .set('nummeraanduidingId', action.payload.nummeraanduidingId)
        .set('openbareRuimteId', action.payload.openbareRuimteId);

    default:
      return state;
  }
};

export const pandReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PAND_DATA:
      return state.set('landelijkId', action.payload.landelijkId);

    case LOAD_PAND_DATA_SUCCESS:
      return state.set('data', action.payload);

    case LOAD_PAND_DATA_FAILED:
      return state.set('error', action.payload).set('data', {});

    default:
      return state;
  }
};

export const nummeraanduidingReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NUMMERAANDUIDING_DATA:
      return state.set('nummeraanduidingId', action.payload.nummeraanduidingId);

    case LOAD_NUMMERAANDUIDING_DATA_SUCCESS:
      return state.set('data', action.payload);

    case LOAD_NUMMERAANDUIDING_DATA_FAILED:
      return state.set('error', action.payload).set('data', {});

    default:
      return state;
  }
};

export const openbareRuimteReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_OPENBARE_RUIMTE_DATA:
      return state.set('openbareRuimteId', action.payload.openbareRuimteId);

    case LOAD_OPENBARE_RUIMTE_DATA_SUCCESS:
      return state.set('data', action.payload);

    case LOAD_OPENBARE_RUIMTE_DATA_FAILED:
      return state.set('error', action.payload).set('data', {});

    default:
      return state;
  }
};

export const kadasterObjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_KADASTER_OBJECT_DATA:
      return state.set('loading', true);

    case LOAD_KADASTER_OBJECT_DATA:
      return state.set('adresseerbaarObjectId', action.payload.adresseerbaarObjectId);

    case LOAD_KADASTER_OBJECT_DATA_SUCCESS:
      return state.set('data', action.payload).set('loading', false);

    case LOAD_KADASTER_OBJECT_DATA_FAILED:
      return state
        .set('error', action.payload)
        .set('loading', false)
        .set('data', {});

    case LOAD_KADASTER_OBJECT_DATA_NO_RESULTS:
      return state.set('data', {});

    default:
      return state;
  }
};

export const kadasterSubjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_KADASTER_SUBJECT_DATA:
      return state.set('adresseerbaarObjectId', action.payload.adresseerbaarObjectId);

    case LOAD_KADASTER_SUBJECT_DATA_SUCCESS:
      return state.set('data', action.payload);

    case LOAD_KADASTER_SUBJECT_DATA_FAILED:
      return state.set('error', action.payload).set('data', {});

    default:
      return state;
  }
};

export const handelsregisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_HR_DATA:
      return state.set('kvkNummers', action.payload);

    case LOAD_HR_DATA_SUCCESS:
      return state.set('data', action.payload);

    case LOAD_HR_DATA_FAILED:
      return state.set('error', action.payload).set('data', {});

    default:
      return state;
  }
};

export const verblijfsobjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_VERBLIJFSOBJECT_DATA:
      return state.set('adresseerbaarObjectId', action.payload.adresseerbaarObjectId);

    case LOAD_VERBLIJFSOBJECT_DATA_SUCCESS:
      return state.set('data', action.payload);

    case LOAD_VERBLIJFSOBJECT_DATA_FAILED:
      return state.set('error', action.payload).set('data', {});

    default:
      return state;
  }
};
