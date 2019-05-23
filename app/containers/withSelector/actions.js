import * as constants from 'containers/App/constants';

export const loadBAGData = payload => ({
  type: constants.LOAD_BAG_DATA,
  payload,
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

export const loadKadastraalSubjectNPData = adresseerbaarObjectId => ({
  type: constants.LOAD_KADASTRAAL_SUBJECT_NP_DATA,
  payload: { adresseerbaarObjectId },
});

export const loadKadastraalSubjectNPDataSuccess = payload => ({
  type: constants.LOAD_KADASTRAAL_SUBJECT_NP_DATA_SUCCESS,
  payload,
});

export const loadKadastraalSubjectNPDataFailed = payload => ({
  type: constants.LOAD_KADASTRAAL_SUBJECT_NP_DATA_FAILED,
  payload,
});

export const loadKadastraalSubjectNPDataNoResults = payload => ({
  type: constants.LOAD_KADASTRAAL_SUBJECT_NP_DATA_NO_RESULTS,
  payload,
});

export const loadKadastraalSubjectNNPData = adresseerbaarObjectId => ({
  type: constants.LOAD_KADASTRAAL_SUBJECT_NNP_DATA,
  payload: { adresseerbaarObjectId },
});

export const loadKadastraalSubjectNNPDataSuccess = payload => ({
  type: constants.LOAD_KADASTRAAL_SUBJECT_NNP_DATA_SUCCESS,
  payload,
});

export const loadKadastraalSubjectNNPDataFailed = payload => ({
  type: constants.LOAD_KADASTRAAL_SUBJECT_NNP_DATA_FAILED,
  payload,
});

export const loadKadastraalSubjectNNPDataNoResults = payload => ({
  type: constants.LOAD_KADASTRAAL_SUBJECT_NNP_DATA_NO_RESULTS,
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

export const loadVerblijfsobjectId = adresseerbaarObjectId => ({
  type: constants.LOAD_VERBLIJFSOBJECT_ID,
  payload: { adresseerbaarObjectId },
});

export const loadVerblijfsobjectIdSuccess = payload => ({
  type: constants.LOAD_VERBLIJFSOBJECT_ID_SUCCESS,
  payload,
});

export const loadVerblijfsobjectIdFailed = payload => ({
  type: constants.LOAD_VERBLIJFSOBJECT_ID_FAILED,
  payload,
});

export const loadVerblijfsobjectIdNoResults = payload => ({
  type: constants.LOAD_VERBLIJFSOBJECT_ID_NO_RESULTS,
  payload,
});

// export const loadVestigingData = () => ({
//   type: constants.LOAD_VESTIGING_DATA,
// });

// export const loadVestigingDataSuccess = payload => ({
//   type: constants.LOAD_VESTIGING_DATA_SUCCESS,
//   payload,
// });

// export const loadVestigingDataFailed = payload => ({
//   type: constants.LOAD_VESTIGING_DATA_FAILED,
//   payload,
// });

// export const loadVestigingDataNoResults = payload => ({
//   type: constants.LOAD_VESTIGING_DATA_NO_RESULTS,
//   payload,
// });

export const loadOpenbareRuimteDataSuccess = payload => ({
  type: constants.LOAD_OPENBARE_RUIMTE_DATA_SUCCESS,
  payload,
});

export const loadOpenbareRuimteDataFailed = payload => ({
  type: constants.LOAD_OPENBARE_RUIMTE_DATA_FAILED,
  payload,
});

export const loadLigplaatsData = ligId => ({
  type: constants.LOAD_LIGPLAATS_DATA,
  payload: { ligId },
});

export const loadLigplaatsDataSuccess = payload => ({
  type: constants.LOAD_LIGPLAATS_DATA_SUCCESS,
  payload,
});

export const loadLigplaatsDataFailed = payload => ({
  type: constants.LOAD_LIGPLAATS_DATA_FAILED,
  payload,
});

export const loadWoonplaatsData = woonplaatsId => ({
  type: constants.LOAD_WOONPLAATS_DATA,
  payload: { woonplaatsId },
});

export const loadWoonplaatsDataSuccess = payload => ({
  type: constants.LOAD_WOONPLAATS_DATA_SUCCESS,
  payload,
});

export const loadWoonplaatsDataFailed = payload => ({
  type: constants.LOAD_WOONPLAATS_DATA_FAILED,
  payload,
});

export const loadWoonplaatsDataNoResults = payload => ({
  type: constants.LOAD_WOONPLAATS_DATA_NO_RESULTS,
  payload,
});
