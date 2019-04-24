import {
  LOAD_NUMMERAANDUIDING_DATA,
  LOAD_NUMMERAANDUIDING_DATA_SUCCESS,
  LOAD_NUMMERAANDUIDING_DATA_FAILED,
  LOAD_PAND_DATA,
  LOAD_PAND_DATA_FAILED,
  LOAD_PAND_DATA_SUCCESS,
  LOAD_OPENBARE_RUIMTE_DATA_SUCCESS,
  LOAD_OPENBARE_RUIMTE_DATA,
  LOAD_OPENBARE_RUIMTE_DATA_FAILED,
  LOAD_KADASTER_OBJECT_DATA_FAILED,
  LOAD_KADASTER_OBJECT_DATA_SUCCESS,
  LOAD_KADASTER_OBJECT_DATA,
  LOAD_PANDLIST_DATA,
  LOAD_PANDLIST_DATA_SUCCESS,
  LOAD_PANDLIST_DATA_FAILED,
  LOAD_LIGPLAATS_DATA,
  LOAD_LIGPLAATS_DATA_SUCCESS,
  LOAD_LIGPLAATS_DATA_FAILED,
  LOAD_VERBLIJFSOBJECT_DATA,
  LOAD_VERBLIJFSOBJECT_DATA_SUCCESS,
  LOAD_VERBLIJFSOBJECT_DATA_FAILED,
  LOAD_BAG_DATA,
  LOAD_BAG_DATA_FAILED,
  LOAD_BAG_DATA_SUCCESS,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_FAILED,
} from './constants';

export const loadDataSuccess = payload => ({
  type: LOAD_DATA_SUCCESS,
  payload,
});

export const loadDataFailed = payload => ({
  type: LOAD_DATA_FAILED,
  payload,
});

export const loadBAGData = payload => ({
  type: LOAD_BAG_DATA,
  payload,
});

export const loadBAGDataFailed = payload => ({
  type: LOAD_BAG_DATA_FAILED,
  payload,
});

export const loadBAGDataSuccess = payload => ({
  type: LOAD_BAG_DATA_SUCCESS,
  payload,
});

export const loadBRKData = id => ({
  type: LOAD_KADASTER_OBJECT_DATA,
  payload: { id },
});

export const loadBRKDataSuccess = payload => ({
  type: LOAD_KADASTER_OBJECT_DATA_SUCCESS,
  payload,
});

export const loadBRKDataFailed = payload => ({
  type: LOAD_KADASTER_OBJECT_DATA_FAILED,
  payload,
});

export const loadNummeraanduidingData = id => ({
  type: LOAD_NUMMERAANDUIDING_DATA,
  payload: { id },
});

export const loadNummeraanduidingSuccess = payload => ({
  type: LOAD_NUMMERAANDUIDING_DATA_SUCCESS,
  payload,
});

export const loadNummeraanduidingFailed = payload => ({
  type: LOAD_NUMMERAANDUIDING_DATA_FAILED,
  payload,
});

export const loadPandData = id => ({
  type: LOAD_PAND_DATA,
  payload: { id },
});

export const loadPandDataSuccess = payload => ({
  type: LOAD_PAND_DATA_SUCCESS,
  payload,
});

export const loadPandDataFailed = payload => ({
  type: LOAD_PAND_DATA_FAILED,
  payload,
});

export const loadPandlistData = id => ({
  type: LOAD_PANDLIST_DATA,
  payload: { id },
});

export const loadPandlistDataSuccess = payload => ({
  type: LOAD_PANDLIST_DATA_SUCCESS,
  payload,
});

export const loadPandlistDataFailed = payload => ({
  type: LOAD_PANDLIST_DATA_FAILED,
  payload,
});

export const loadOpenbareRuimteData = id => ({
  type: LOAD_OPENBARE_RUIMTE_DATA,
  payload: { id },
});

export const loadOpenbareRuimteDataSuccess = payload => ({
  type: LOAD_OPENBARE_RUIMTE_DATA_SUCCESS,
  payload,
});

export const loadOpenbareRuimteDataFailed = payload => ({
  type: LOAD_OPENBARE_RUIMTE_DATA_FAILED,
  payload,
});

export const loadLigplaatsData = id => ({
  type: LOAD_LIGPLAATS_DATA,
  payload: { id },
});

export const loadLigplaatsDataSuccess = payload => ({
  type: LOAD_LIGPLAATS_DATA_SUCCESS,
  payload,
});

export const loadLigplaatsDataFailed = payload => ({
  type: LOAD_LIGPLAATS_DATA_FAILED,
  payload,
});

export const loadVerblijfsobjectData = id => ({
  type: LOAD_VERBLIJFSOBJECT_DATA,
  payload: { id },
});

export const loadVerblijfsobjectDataSuccess = payload => ({
  type: LOAD_VERBLIJFSOBJECT_DATA_SUCCESS,
  payload,
});

export const loadVerblijfsobjectDataFailed = payload => ({
  type: LOAD_VERBLIJFSOBJECT_DATA_FAILED,
  payload,
});
