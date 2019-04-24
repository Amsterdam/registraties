import { fromJS } from 'immutable';

import {
  LOAD_NUMMERAANDUIDING_DATA,
  LOAD_NUMMERAANDUIDING_DATA_SUCCESS,
  LOAD_PAND_DATA,
  LOAD_PAND_DATA_SUCCESS,
  LOAD_OPENBARE_RUIMTE_DATA,
  LOAD_OPENBARE_RUIMTE_DATA_SUCCESS,
  LOAD_KADASTER_OBJECT_DATA,
  LOAD_KADASTER_OBJECT_DATA_SUCCESS,
  LOAD_PAND_DATA_FAILED,
  LOAD_NUMMERAANDUIDING_DATA_FAILED,
  LOAD_OPENBARE_RUIMTE_DATA_FAILED,
  LOAD_KADASTER_OBJECT_DATA_FAILED,
  LOAD_LIGPLAATS_DATA,
  LOAD_LIGPLAATS_DATA_SUCCESS,
  LOAD_LIGPLAATS_DATA_FAILED,
  LOAD_VERBLIJFSOBJECT_DATA,
  LOAD_VERBLIJFSOBJECT_DATA_SUCCESS,
  LOAD_VERBLIJFSOBJECT_DATA_FAILED,
  LOAD_BAG_DATA,
  LOAD_BAG_DATA_SUCCESS,
  LOAD_BAG_DATA_FAILED,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  loading: false,
  error: false,
});

export const bagReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BAG_DATA:
      return state.set('landelijkId', action.payload.landelijkId);

    case LOAD_BAG_DATA_SUCCESS:
      return state.set('data', action.payload);

    case LOAD_BAG_DATA_FAILED:
      return state.set('error', action.payload);

    default:
      return state;
  }
};

export const pandReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PAND_DATA:
      return state.set('id', action.payload.id);

    case LOAD_PAND_DATA_SUCCESS:
      return state.set('data', action.payload);

    case LOAD_PAND_DATA_FAILED:
      return state.set('error', action.payload);

    default:
      return state;
  }
};

export const nummeraanduidingReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NUMMERAANDUIDING_DATA:
      return state.set('id', action.payload.id);

    case LOAD_NUMMERAANDUIDING_DATA_SUCCESS:
      return state.set('data', action.payload);

    case LOAD_NUMMERAANDUIDING_DATA_FAILED:
      return state.set('error', action.payload);

    default:
      return state;
  }
};

export const openbareRuimteReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_OPENBARE_RUIMTE_DATA:
      return state.set('id', action.payload.id);

    case LOAD_OPENBARE_RUIMTE_DATA_SUCCESS:
      return state.set('data', action.payload);

    case LOAD_OPENBARE_RUIMTE_DATA_FAILED:
      return state.set('error', action.payload);

    default:
      return state;
  }
};

export const kadasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_KADASTER_OBJECT_DATA:
      return state.set('id', action.payload.id);

    case LOAD_KADASTER_OBJECT_DATA_SUCCESS:
      return state.set('data', action.payload);

    case LOAD_KADASTER_OBJECT_DATA_FAILED:
      return state.set('error', action.payload);

    default:
      return state;
  }
};

export const ligplaatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_LIGPLAATS_DATA:
      return state.set('id', action.payload.id);

    case LOAD_LIGPLAATS_DATA_SUCCESS:
      return state.set('data', action.payload);

    case LOAD_LIGPLAATS_DATA_FAILED:
      return state.set('error', action.payload);

    default:
      return state;
  }
};

export const verblijfsobjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_VERBLIJFSOBJECT_DATA:
      return state.set('id', action.payload.id);

    case LOAD_VERBLIJFSOBJECT_DATA_SUCCESS:
      return state.set('data', action.payload);

    case LOAD_VERBLIJFSOBJECT_DATA_FAILED:
      return state.set('error', action.payload);

    default:
      return state;
  }
};
