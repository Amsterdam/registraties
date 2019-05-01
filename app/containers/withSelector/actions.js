import * as constants from './constants';

export const loadBAGData = ({ adresseerbaarObjectId, nummeraanduidingId, openbareRuimteId }) => ({
  type: constants.LOAD_BAG_DATA,
  payload: { adresseerbaarObjectId, nummeraanduidingId, openbareRuimteId },
});

export const loadKadastraalObjectData = adresseerbaarObjectId => ({
  type: constants.LOAD_KADASTRAAL_OBJECT_DATA,
  payload: { adresseerbaarObjectId },
});

export const loadKadastraalObjectDataSuccess = payload => ({
  type: constants.LOAD_KADASTRAAL_OBJECT_DATA_SUCCESS,
  payload,
});

export const loadKadastraalObjectDataFailed = payload => ({
  type: constants.LOAD_KADASTRAAL_OBJECT_DATA_FAILED,
  payload,
});

export const loadKadastraalObjectDataNoResults = payload => ({
  type: constants.LOAD_KADASTRAAL_OBJECT_DATA_NO_RESULTS,
  payload,
});

export const loadKadastraalSubjectData = adresseerbaarObjectId => ({
  type: constants.LOAD_KADASTRAAL_SUBJECT_DATA,
  payload: { adresseerbaarObjectId },
});

export const loadKadastraalSubjectDataSuccess = payload => ({
  type: constants.LOAD_KADASTRAAL_SUBJECT_DATA_SUCCESS,
  payload,
});

export const loadKadastraalSubjectDataFailed = payload => ({
  type: constants.LOAD_KADASTRAAL_SUBJECT_DATA_FAILED,
  payload,
});

export const loadKadastraalSubjectDataNoResults = payload => ({
  type: constants.LOAD_KADASTRAAL_SUBJECT_DATA_NO_RESULTS,
  payload,
});

export const loadNummeraanduidingData = nummeraanduidingId => ({
  type: constants.LOAD_NUMMERAANDUIDING_DATA,
  payload: { nummeraanduidingId },
});

export const loadNummeraanduidingSuccess = payload => ({
  type: constants.LOAD_NUMMERAANDUIDING_DATA_SUCCESS,
  payload,
});

export const loadNummeraanduidingFailed = payload => ({
  type: constants.LOAD_NUMMERAANDUIDING_DATA_FAILED,
  payload,
});

export const loadPandData = landelijkId => ({
  type: constants.LOAD_PAND_DATA,
  payload: { landelijkId },
});

export const loadPandDataSuccess = payload => ({
  type: constants.LOAD_PAND_DATA_SUCCESS,
  payload,
});

export const loadPandDataFailed = payload => ({
  type: constants.LOAD_PAND_DATA_FAILED,
  payload,
});

export const loadPandlistData = adresseerbaarObjectId => ({
  type: constants.LOAD_PANDLIST_DATA,
  payload: { adresseerbaarObjectId },
});

export const loadPandlistDataSuccess = payload => ({
  type: constants.LOAD_PANDLIST_DATA_SUCCESS,
  payload,
});

export const loadPandlistDataFailed = payload => ({
  type: constants.LOAD_PANDLIST_DATA_FAILED,
  payload,
});

export const loadPandlistDataNoResults = payload => ({
  type: constants.LOAD_PANDLIST_DATA_NO_RESULTS,
  payload,
});

export const loadOpenbareRuimteData = openbareRuimteId => ({
  type: constants.LOAD_OPENBARE_RUIMTE_DATA,
  payload: { openbareRuimteId },
});

export const loadOpenbareRuimteDataSuccess = payload => ({
  type: constants.LOAD_OPENBARE_RUIMTE_DATA_SUCCESS,
  payload,
});

export const loadOpenbareRuimteDataFailed = payload => ({
  type: constants.LOAD_OPENBARE_RUIMTE_DATA_FAILED,
  payload,
});

export const loadVerblijfsobjectData = adresseerbaarObjectId => ({
  type: constants.LOAD_VERBLIJFSOBJECT_DATA,
  payload: { adresseerbaarObjectId },
});

export const loadVerblijfsobjectDataSuccess = payload => ({
  type: constants.LOAD_VERBLIJFSOBJECT_DATA_SUCCESS,
  payload,
});

export const loadVerblijfsobjectDataFailed = payload => ({
  type: constants.LOAD_VERBLIJFSOBJECT_DATA_FAILED,
  payload,
});

export const loadVestigingData = () => ({
  type: constants.LOAD_VESTIGING_DATA,
});

export const loadVestigingDataSuccess = payload => ({
  type: constants.LOAD_VESTIGING_DATA_SUCCESS,
  payload,
});

export const loadVestigingDataFailed = payload => ({
  type: constants.LOAD_VESTIGING_DATA_FAILED,
  payload,
});

export const loadVestigingDataNoResults = payload => ({
  type: constants.LOAD_VESTIGING_DATA_NO_RESULTS,
  payload,
});
