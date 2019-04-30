import { fromJS } from 'immutable';
import * as constants from './constants';

// The initial state of the App
export const initialState = fromJS({
  loading: false,
  error: false,
});

export const bagReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.LOAD_BAG_DATA:
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
    case constants.LOAD_PAND_DATA:
      return state.set('landelijkId', action.payload.landelijkId);

    case constants.LOAD_PAND_DATA_SUCCESS:
      return state.set('data', action.payload);

    case constants.LOAD_PAND_DATA_FAILED:
      return state.set('error', action.payload).set('data', {});

    default:
      return state;
  }
};

export const nummeraanduidingReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.LOAD_NUMMERAANDUIDING_DATA:
      return state.set('nummeraanduidingId', action.payload.nummeraanduidingId);

    case constants.LOAD_NUMMERAANDUIDING_DATA_SUCCESS:
      return state.set('data', action.payload);

    case constants.LOAD_NUMMERAANDUIDING_DATA_FAILED:
      return state.set('error', action.payload).set('data', {});

    default:
      return state;
  }
};

export const kadastraalObjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.LOAD_KADASTRAAL_OBJECT_DATA:
      return state.set('adresseerbaarObjectId', action.payload.adresseerbaarObjectId);

    case constants.LOAD_KADASTRAAL_OBJECT_DATA_SUCCESS:
      return state.set('data', action.payload).set('loading', false);

    case constants.LOAD_KADASTRAAL_OBJECT_DATA_FAILED:
      return state
        .set('error', action.payload)
        .set('loading', false)
        .set('data', {});

    case constants.LOAD_KADASTRAAL_OBJECT_DATA_NO_RESULTS:
      return state.set('data', {});

    default:
      return state;
  }
};

export const kadastraalSubjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.LOAD_KADASTRAAL_SUBJECT_DATA:
      return state.set('adresseerbaarObjectId', action.payload.adresseerbaarObjectId);

    case constants.LOAD_KADASTRAAL_SUBJECT_DATA_SUCCESS:
      return state.set('data', action.payload);

    case constants.LOAD_KADASTRAAL_SUBJECT_DATA_FAILED:
      return state.set('error', action.payload).set('data', {});

    default:
      return state;
  }
};

export const handelsregisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.LOAD_HR_DATA:
      return state.set('kvkNummers', action.payload);

    case constants.LOAD_HR_DATA_SUCCESS:
      return state.set('data', action.payload);

    case constants.LOAD_HR_DATA_FAILED:
      return state.set('error', action.payload).set('data', {});

    default:
      return state;
  }
};

export const verblijfsobjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.LOAD_VERBLIJFSOBJECT_DATA:
      return state.set('adresseerbaarObjectId', action.payload.adresseerbaarObjectId);

    case constants.LOAD_VERBLIJFSOBJECT_DATA_SUCCESS:
      return state.set('data', action.payload);

    case constants.LOAD_VERBLIJFSOBJECT_DATA_FAILED:
      return state.set('error', action.payload).set('data', {});

    default:
      return state;
  }
};

export const vestigingReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.LOAD_VESTIGING_DATA_SUCCESS:
      return state.set('data', action.payload);

    case constants.LOAD_VESTIGING_DATA_FAILED:
      return state.set('error', action.payload).set('data', {});

    default:
      return state;
  }
};
