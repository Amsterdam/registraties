import produce from 'immer';
import * as constants from 'containers/App/constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
export const tocReducer = (state = { toc: [] }, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.LOAD_BAG_DATA:
        draft.toc = [];
        break;

      case constants.LOAD_PAND_DATA_SUCCESS:
        draft.toc[4] = constants.OBJECTS.PAND.NAME;
        break;

      case constants.LOAD_NUMMERAANDUIDING_DATA_SUCCESS:
        draft.toc[2] = constants.OBJECTS.NUMMERAANDUIDING.NAME;
        draft.toc[9] = constants.OBJECTS.GEBIED.NAME;
        break;

      case constants.LOAD_KADASTRAAL_OBJECT_DATA_SUCCESS:
        draft.toc[5] = constants.OBJECTS.KADASTRAAL_OBJECT.NAME;
        break;

      case constants.LOAD_KADASTRAAL_SUBJECT_NP_DATA_SUCCESS:
        draft.toc[6] = constants.OBJECTS.KADASTRAAL_SUBJECT_NP.NAME;
        break;

      case constants.LOAD_KADASTRAAL_SUBJECT_NNP_DATA_SUCCESS:
        draft.toc[7] = constants.OBJECTS.KADASTRAAL_SUBJECT_NNP.NAME;
        break;

      case constants.LOAD_VERBLIJFSOBJECT_DATA_SUCCESS:
        draft.toc[3] = constants.OBJECTS.VERBLIJFSOBJECT.NAME;
        break;

      case constants.LOAD_VESTIGING_DATA_SUCCESS:
        draft.toc[8] = constants.OBJECTS.VESTIGING.NAME;
        break;

      case constants.LOAD_OPENBARE_RUIMTE_DATA_SUCCESS:
        draft.toc[0] = constants.OBJECTS.OPENBARE_RUIMTE.NAME;
        break;

      case constants.LOAD_WOONPLAATS_DATA_SUCCESS:
        draft.toc[1] = constants.OBJECTS.WOONPLAATS.NAME;
        break;
    }
  });

export const bagReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.LOAD_BAG_DATA:
        draft.vboId = action.payload.vboId;
        draft.ligId = action.payload.ligId;
        draft.brkId = action.payload.brkId;
        break;
    }
  });

export const pandReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.LOAD_DATA_PENDING:
        draft.data = undefined;
        break;

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
      case constants.LOAD_DATA_PENDING:
        draft.data = undefined;
        break;

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
      case constants.LOAD_DATA_PENDING:
        draft.data = undefined;
        break;

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

export const kadastraalSubjectNPReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.LOAD_DATA_PENDING:
        draft.data = undefined;
        break;

      case constants.LOAD_KADASTRAAL_SUBJECT_NP_DATA:
        draft.adresseerbaarObjectId = action.payload.adresseerbaarObjectId;
        break;

      case constants.LOAD_KADASTRAAL_SUBJECT_NP_DATA_SUCCESS:
        draft.data = action.payload;
        break;

      case constants.LOAD_KADASTRAAL_SUBJECT_NP_DATA_FAILED:
        draft.error = action.payload;
        break;

      case constants.LOAD_KADASTRAAL_SUBJECT_NP_DATA_NO_RESULTS:
        draft.data = null;
        break;
    }
  });

export const kadastraalSubjectNNPReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.LOAD_DATA_PENDING:
        draft.data = undefined;
        break;

      case constants.LOAD_KADASTRAAL_SUBJECT_NNP_DATA:
        draft.adresseerbaarObjectId = action.payload.adresseerbaarObjectId;
        break;

      case constants.LOAD_KADASTRAAL_SUBJECT_NNP_DATA_SUCCESS:
        draft.data = action.payload;
        break;

      case constants.LOAD_KADASTRAAL_SUBJECT_NNP_DATA_FAILED:
        draft.error = action.payload;
        break;

      case constants.LOAD_KADASTRAAL_SUBJECT_NNP_DATA_NO_RESULTS:
        draft.data = null;
        break;
    }
  });

export const verblijfsobjectReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.LOAD_DATA_PENDING:
        draft.data = undefined;
        break;

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

export const ligplaatsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.LOAD_DATA_PENDING:
        draft.data = undefined;
        break;

      case constants.LOAD_LIGPLAATS_DATA:
        draft.ligId = action.payload.ligId;
        break;

      case constants.LOAD_LIGPLAATS_DATA_SUCCESS:
        draft.data = action.payload;
        break;

      case constants.LOAD_LIGPLAATS_DATA_FAILED:
        draft.error = action.payload;
        break;
    }
  });

export const vestigingReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.LOAD_DATA_PENDING:
        draft.data = undefined;
        break;

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

export const openbareRuimteReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.LOAD_DATA_PENDING:
        draft.data = undefined;
        break;

      case constants.LOAD_OPENBARE_RUIMTE_DATA_SUCCESS:
        draft.data = action.payload;
        break;

      case constants.LOAD_OPENBARE_RUIMTE_DATA_FAILED:
        draft.error = action.payload;
        break;
    }
  });

export const woonplaatsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.LOAD_DATA_PENDING:
        draft.data = undefined;
        break;

      case constants.LOAD_WOONPLAATS_DATA_SUCCESS:
        draft.data = action.payload;
        break;

      case constants.LOAD_WOONPLAATS_DATA_FAILED:
        draft.error = action.payload;
        break;
    }
  });
