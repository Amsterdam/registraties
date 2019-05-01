import produce from 'immer';
import * as constants from 'containers/App/constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
export const bagReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.LOAD_BAG_DATA:
        draft.adresseerbaarObjectId = action.payload.adresseerbaarObjectId;
        draft.nummeraanduidingId = action.payload.nummeraanduidingId;
        draft.openbareRuimteId = action.payload.openbareRuimteId;
        break;
    }
  });

export const pandReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.LOAD_PAND_DATA:
        draft.landelijkId = action.payload.landelijkId;
        break;

      case constants.LOAD_PAND_DATA_SUCCESS:
        draft.data = action.payload;
        break;

      case constants.LOAD_PAND_DATA_FAILED:
        draft.error = action.payload;
        break;
    }
  });

export const nummeraanduidingReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.LOAD_NUMMERAANDUIDING_DATA:
        draft.nummeraanduidingId = action.payload.nummeraanduidingId;
        break;

      case constants.LOAD_NUMMERAANDUIDING_DATA_SUCCESS:
        draft.data = action.payload;
        break;

      case constants.LOAD_NUMMERAANDUIDING_DATA_FAILED:
        draft.error = action.payload;
        break;
    }
  });

export const kadastraalObjectReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.LOAD_KADASTRAAL_OBJECT_DATA:
        draft.adresseerbaarObjectId = action.payload.adresseerbaarObjectId;
        break;

      case constants.LOAD_KADASTRAAL_OBJECT_DATA_SUCCESS:
        draft.data = action.payload;
        break;

      case constants.LOAD_KADASTRAAL_OBJECT_DATA_FAILED:
        draft.error = action.payload;
        break;
    }
  });

export const kadastraalSubjectReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.LOAD_KADASTRAAL_SUBJECT_DATA:
        draft.adresseerbaarObjectId = action.payload.adresseerbaarObjectId;
        break;

      case constants.LOAD_KADASTRAAL_SUBJECT_DATA_SUCCESS:
        draft.data = action.payload;
        break;

      case constants.LOAD_KADASTRAAL_SUBJECT_DATA_FAILED:
        draft.error = action.payload;
        break;
    }
  });

export const verblijfsobjectReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.LOAD_VERBLIJFSOBJECT_DATA:
        draft.adresseerbaarObjectId = action.payload.adresseerbaarObjectId;
        break;

      case constants.LOAD_VERBLIJFSOBJECT_DATA_SUCCESS:
        draft.data = action.payload;
        break;

      case constants.LOAD_VERBLIJFSOBJECT_DATA_FAILED:
        draft.error = action.payload;
        break;
    }
  });

export const vestigingReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.LOAD_VESTIGING_DATA_SUCCESS:
        draft.data = action.payload;
        break;

      case constants.LOAD_VESTIGING_DATA_FAILED:
        draft.error = action.payload;
        break;

      case constants.LOAD_VESTIGING_DATA_NO_RESULTS:
        draft.data = undefined;
        break;
    }
  });
