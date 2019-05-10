import { scope } from '../../i18n';

const containerScope = `${scope}/App`;

export const UNABLE_TO_FETCH = `${containerScope}/App/UNABLE_TO_FETCH`;
export const UNAUTHORIZED = `${containerScope}/App/UNAUTHORIZED`;

export const AUTHENTICATE_USER = `${containerScope}/App/AUTHENTICATE_USER`;
export const AUTHORIZE_USER = `${containerScope}/App/AUTHORIZE_USER`;

export const SHOW_GLOBAL_ERROR = `${containerScope}/App/SHOW_GLOBAL_ERROR`;
export const RESET_GLOBAL_ERROR = `${containerScope}/App/RESET_GLOBAL_ERROR`;

export const LOGIN = `${containerScope}/App/LOGIN`;
export const LOGOUT = `${containerScope}/App/LOGOUT`;

export const LOAD_DATA_PENDING = `${containerScope}/App/LOAD_DATA_PENDING`;
export const LOAD_DATA_SUCCESS = `${containerScope}/App/LOAD_DATA_SUCCESS`;
export const LOAD_DATA_FAILED = `${containerScope}/App/LOAD_DATA_FAILED`;

export const LOAD_BAG_DATA = `${containerScope}/LOAD_BAG_DATA`;

export const LOAD_NUMMERAANDUIDING_DATA = `${containerScope}/LOAD_NUMMERAANDUIDING_DATA`;
export const LOAD_NUMMERAANDUIDING_DATA_SUCCESS = `${containerScope}/LOAD_NUMMERAANDUIDING_SUCCESS`;
export const LOAD_NUMMERAANDUIDING_DATA_FAILED = `${containerScope}/LOAD_NUMMERAANDUIDING_FAILED`;

export const LOAD_PAND_DATA = `${containerScope}/LOAD_PAND_DATA`;
export const LOAD_PAND_DATA_SUCCESS = `${containerScope}/LOAD_PAND_DATA_SUCCESS`;
export const LOAD_PAND_DATA_FAILED = `${containerScope}/LOAD_PAND_DATA_FAILED`;

export const LOAD_OPENBARE_RUIMTE_DATA = `${containerScope}/LOAD_OPENBARE_RUIMTE_DATA`;
export const LOAD_OPENBARE_RUIMTE_DATA_SUCCESS = `${containerScope}/LOAD_OPENBARE_RUIMTE_DATA_SUCCESS`;
export const LOAD_OPENBARE_RUIMTE_DATA_FAILED = `${containerScope}/LOAD_OPENBARE_RUIMTE_DATA_FAILED`;

export const LOAD_PANDLIST_DATA = `${containerScope}/LOAD_PANDLIST_DATA`;
export const LOAD_PANDLIST_DATA_SUCCESS = `${containerScope}/LOAD_PAND_DATALIST_SUCCESS`;
export const LOAD_PANDLIST_DATA_FAILED = `${containerScope}/LOAD_PAND_DATALIST_FAILED`;
export const LOAD_PANDLIST_DATA_NO_RESULTS = `${containerScope}/LOAD_PANDLIST_DATA_NO_RESULTS`;

export const LOAD_KADASTRAAL_OBJECT_DATA = `${containerScope}/LOAD_KADASTRAAL_OBJECT_DATA`;
export const LOAD_KADASTRAAL_OBJECT_DATA_SUCCESS = `${containerScope}/LOAD_KADASTRAAL_OBJECT_DATA_SUCCESS`;
export const LOAD_KADASTRAAL_OBJECT_DATA_FAILED = `${containerScope}/LOAD_KADASTRAAL_OBJECT_DATA_FAILED`;
export const LOAD_KADASTRAAL_OBJECT_DATA_NO_RESULTS = `${containerScope}/LOAD_KADASTRAAL_OBJECT_DATA_NO_RESULTS`;

export const LOAD_KADASTRAAL_SUBJECT_NP_DATA = `${containerScope}/LOAD_KADASTRAAL_SUBJECT_NP_DATA`;
export const LOAD_KADASTRAAL_SUBJECT_NP_DATA_SUCCESS = `${containerScope}/LOAD_KADASTRAAL_SUBJECT_NP_DATA_SUCCESS`;
export const LOAD_KADASTRAAL_SUBJECT_NP_DATA_FAILED = `${containerScope}/LOAD_KADASTRAAL_SUBJECT_NP_DATA_FAILED`;
export const LOAD_KADASTRAAL_SUBJECT_NP_DATA_NO_RESULTS = `${containerScope}/LOAD_KADASTRAAL_SUBJECT_NP_DATA_NO_RESULTS`;

export const LOAD_KADASTRAAL_SUBJECT_NNP_DATA = `${containerScope}/LOAD_KADASTRAAL_SUBJECT_NNP_DATA`;
export const LOAD_KADASTRAAL_SUBJECT_NNP_DATA_SUCCESS = `${containerScope}/LOAD_KADASTRAAL_SUBJECT_NNP_DATA_SUCCESS`;
export const LOAD_KADASTRAAL_SUBJECT_NNP_DATA_FAILED = `${containerScope}/LOAD_KADASTRAAL_SUBJECT_NNP_DATA_FAILED`;
export const LOAD_KADASTRAAL_SUBJECT_NNP_DATA_NO_RESULTS = `${containerScope}/LOAD_KADASTRAAL_SUBJECT_NNP_DATA_NO_RESULTS`;

export const LOAD_VERBLIJFSOBJECT_DATA = `${containerScope}/LOAD_VERBLIJFSOBJECT_DATA`;
export const LOAD_VERBLIJFSOBJECT_DATA_SUCCESS = `${containerScope}/LOAD_VERBLIJFSOBJECT_DATA_SUCCESS`;
export const LOAD_VERBLIJFSOBJECT_DATA_FAILED = `${containerScope}/LOAD_VERBLIJFSOBJECT_DATA_FAILED`;

export const LOAD_LIGPLAATS_DATA = `${containerScope}/LOAD_LIGPLAATS_DATA`;
export const LOAD_LIGPLAATS_DATA_SUCCESS = `${containerScope}/LOAD_LIGPLAATS_DATA_SUCCESS`;
export const LOAD_LIGPLAATS_DATA_FAILED = `${containerScope}/LOAD_LIGPLAATS_DATA_FAILED`;

export const LOAD_VESTIGING_DATA = `${containerScope}/LOAD_VESTIGING_DATA`;
export const LOAD_VESTIGING_DATA_SUCCESS = `${containerScope}/LOAD_VESTIGING_DATA_SUCCESS`;
export const LOAD_VESTIGING_DATA_FAILED = `${containerScope}/LOAD_VESTIGING_DATA_FAILED`;
export const LOAD_VESTIGING_DATA_NO_RESULTS = `${containerScope}/LOAD_VESTIGING_DATA_NO_RESULTS`;
export const OBJECTS = {
  OPENBARE_RUIMTE: {
    ABBR: 'opr',
    NAME: { id: 'basisregistratie-wonen.public_space' },
    STELSELPEDIA_LINK: '//www.amsterdam.nl/stelselpedia/bag-index/catalogus-bag/objectklasse-3/',
  },
  NUMMERAANDUIDING: {
    ABBR: 'num',
    NAME: { id: 'basisregistratie-wonen.number_identification' },
    STELSELPEDIA_LINK: '//www.amsterdam.nl/stelselpedia/bag-index/catalogus-bag/objectklasse-2/',
  },
  VERBLIJFSOBJECT: {
    ABBR: 'vbo',
    NAME: { id: 'basisregistratie-wonen.accommodation_object' },
    STELSELPEDIA_LINK: '//www.amsterdam.nl/stelselpedia/bag-index/catalogus-bag/objectklasse-0/',
  },
  PAND: {
    ABBR: 'pnd',
    NAME: { id: 'basisregistratie-wonen.house' },
    STELSELPEDIA_LINK: '//www.amsterdam.nl/stelselpedia/bag-index/catalogus-bag/objectklasse-pand/',
  },
  KADASTRAAL_OBJECT: {
    ABBR: 'brko',
    NAME: { id: 'basisregistratie-wonen.cadastral_object' },
    STELSELPEDIA_LINK: '//www.amsterdam.nl/stelselpedia/brk-index/catalog-brk-levering/objectklasse-4/',
  },
  KADASTRAAL_SUBJECT_NP: {
    ABBR: 'brks_np',
    NAME: { id: 'basisregistratie-wonen.natural_person' },
    STELSELPEDIA_LINK: '//www.amsterdam.nl/stelselpedia/hr-index/catalogus/persoon/natuurlijk-persoon/',
  },
  KADASTRAAL_SUBJECT_NNP: {
    ABBR: 'brks_nnp',
    NAME: { id: 'basisregistratie-wonen.non_natural_person' },
    STELSELPEDIA_LINK: '//www.amsterdam.nl/stelselpedia/hr-index/catalogus/persoon/niet-natuurlijk-pers/',
  },
  VESTIGING: {
    ABBR: 'ves',
    NAME: { id: 'basisregistratie-wonen.establishment' },
    STELSELPEDIA_LINK: '//www.amsterdam.nl/stelselpedia/hr-index/catalogus/vestiging/',
  },
  GEBIED: {
    ABBR: 'geb',
    NAME: { id: 'basisregistratie-wonen.area' },
    STELSELPEDIA_LINK: '//www.amsterdam.nl/stelselpedia/gebieden-index/catalogus/',
  },
};
