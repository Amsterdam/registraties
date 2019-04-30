import {
  LOAD_BAG_DATA,
  LOAD_DATA_FAILED,
  LOAD_DATA_SUCCESS,
  LOAD_KADASTER_OBJECT_DATA_FAILED,
  LOAD_KADASTER_OBJECT_DATA_NO_RESULTS,
  LOAD_KADASTER_OBJECT_DATA_SUCCESS,
  LOAD_KADASTER_OBJECT_DATA,
  LOAD_KADASTER_SUBJECT_DATA_FAILED,
  LOAD_KADASTER_SUBJECT_DATA_NO_RESULTS,
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
  LOAD_PANDLIST_DATA_FAILED,
  LOAD_PANDLIST_DATA_NO_RESULTS,
  LOAD_PANDLIST_DATA_SUCCESS,
  LOAD_PANDLIST_DATA,
  LOAD_VERBLIJFSOBJECT_DATA_FAILED,
  LOAD_VERBLIJFSOBJECT_DATA_SUCCESS,
  LOAD_VERBLIJFSOBJECT_DATA,
  FETCHING_KADASTER_OBJECT_DATA,
  LOAD_HR_DATA,
  LOAD_HR_DATA_SUCCESS,
  LOAD_HR_DATA_FAILED,
} from './constants';

export const loadDataSuccess = payload => ({
  type: LOAD_DATA_SUCCESS,
  payload,
});

export const loadDataFailed = payload => ({
  type: LOAD_DATA_FAILED,
  payload,
});

export const loadBAGData = ({ adresseerbaarObjectId, nummeraanduidingId, openbareRuimteId }) => ({
  type: LOAD_BAG_DATA,
  payload: { adresseerbaarObjectId, nummeraanduidingId, openbareRuimteId },
});

export const fetchingKadasterObjectData = () => ({
  type: FETCHING_KADASTER_OBJECT_DATA,
});

export const loadKadasterObjectData = adresseerbaarObjectId => ({
  type: LOAD_KADASTER_OBJECT_DATA,
  payload: { adresseerbaarObjectId },
});

export const loadKadasterObjectDataSuccess = payload => ({
  type: LOAD_KADASTER_OBJECT_DATA_SUCCESS,
  payload,
});

export const loadKadasterObjectDataFailed = payload => ({
  type: LOAD_KADASTER_OBJECT_DATA_FAILED,
  payload,
});

export const loadKadasterObjectDataNoResults = payload => ({
  type: LOAD_KADASTER_OBJECT_DATA_NO_RESULTS,
  payload,
});

export const loadKadasterSubjectData = adresseerbaarObjectId => ({
  type: LOAD_KADASTER_SUBJECT_DATA,
  payload: { adresseerbaarObjectId },
});

export const loadKadasterSubjectDataSuccess = payload => ({
  type: LOAD_KADASTER_SUBJECT_DATA_SUCCESS,
  payload,
});

export const loadKadasterSubjectDataFailed = payload => ({
  type: LOAD_KADASTER_SUBJECT_DATA_FAILED,
  payload,
});

export const loadKadasterSubjectDataNoResults = payload => ({
  type: LOAD_KADASTER_SUBJECT_DATA_NO_RESULTS,
  payload,
});

export const loadHandelsregisterData = kvkNummers => ({
  type: LOAD_HR_DATA,
  payload: { kvkNummers },
});

export const loadHandelsregisterDataSuccess = payload => ({
  type: LOAD_HR_DATA_SUCCESS,
  payload,
});

export const loadHandelsregisterDataFailed = payload => ({
  type: LOAD_HR_DATA_FAILED,
  payload,
});

export const loadNummeraanduidingData = nummeraanduidingId => ({
  type: LOAD_NUMMERAANDUIDING_DATA,
  payload: { nummeraanduidingId },
});

export const loadNummeraanduidingSuccess = payload => ({
  type: LOAD_NUMMERAANDUIDING_DATA_SUCCESS,
  payload,
});

export const loadNummeraanduidingFailed = payload => ({
  type: LOAD_NUMMERAANDUIDING_DATA_FAILED,
  payload,
});

export const loadPandData = landelijkId => ({
  type: LOAD_PAND_DATA,
  payload: { landelijkId },
});

export const loadPandDataSuccess = payload => ({
  type: LOAD_PAND_DATA_SUCCESS,
  payload,
});

export const loadPandDataFailed = payload => ({
  type: LOAD_PAND_DATA_FAILED,
  payload,
});

export const loadPandlistData = adresseerbaarObjectId => ({
  type: LOAD_PANDLIST_DATA,
  payload: { adresseerbaarObjectId },
});

export const loadPandlistDataSuccess = payload => ({
  type: LOAD_PANDLIST_DATA_SUCCESS,
  payload,
});

export const loadPandlistDataFailed = payload => ({
  type: LOAD_PANDLIST_DATA_FAILED,
  payload,
});

export const loadPandlistDataNoResults = payload => ({
  type: LOAD_PANDLIST_DATA_NO_RESULTS,
  payload,
});

export const loadOpenbareRuimteData = openbareRuimteId => ({
  type: LOAD_OPENBARE_RUIMTE_DATA,
  payload: { openbareRuimteId },
});

export const loadOpenbareRuimteDataSuccess = payload => ({
  type: LOAD_OPENBARE_RUIMTE_DATA_SUCCESS,
  payload,
});

export const loadOpenbareRuimteDataFailed = payload => ({
  type: LOAD_OPENBARE_RUIMTE_DATA_FAILED,
  payload,
});

export const loadVerblijfsobjectData = adresseerbaarObjectId => ({
  type: LOAD_VERBLIJFSOBJECT_DATA,
  payload: { adresseerbaarObjectId },
});

export const loadVerblijfsobjectDataSuccess = payload => ({
  type: LOAD_VERBLIJFSOBJECT_DATA_SUCCESS,
  payload,
});

export const loadVerblijfsobjectDataFailed = payload => ({
  type: LOAD_VERBLIJFSOBJECT_DATA_FAILED,
  payload,
});
