const scope = 'basisregistratie-wonen';

export const OBJECTS = {
  NUMMERAANDUIDING: {
    ABBREV: 'num',
    NAME: 'Nummeraanduiding',
    STELSELPEDIA_LINK: '//www.amsterdam.nl/stelselpedia/bag-index/catalogus-bag/objectklasse-2/',
  },
  PAND: {
    ABBR: 'pnd',
    NAME: 'Pand',
    STELSELPEDIA_LINK: '//www.amsterdam.nl/stelselpedia/bag-index/catalogus-bag/objectklasse-pand/',
  },
  VERBLIJFSOBJECT: {
    ABBR: 'vbo',
    NAME: 'Verblijfsobject',
    STELSELPEDIA_LINK: '//www.amsterdam.nl/stelselpedia/bag-index/catalogus-bag/objectklasse-0/',
  },
  KADASTRAAL_OBJECT: {
    ABBR: 'brko',
    NAME: 'Kadastraal object',
    STELSELPEDIA_LINK: '//www.amsterdam.nl/stelselpedia/brk-index/catalog-brk-levering/objectklasse-4/',
  },
  KADASTRAAL_SUBJECT_NP: {
    ABBR: 'brks_np',
    NAME: 'Kadastraal subject NP',
    STELSELPEDIA_LINK: '//www.amsterdam.nl/stelselpedia/hr-index/catalogus/persoon/natuurlijk-persoon/',
  },
  KADASTRAAL_SUBJECT_NNP: {
    ABBR: 'brks_nnp',
    NAME: 'Kadastraal subject NNP',
    STELSELPEDIA_LINK: '//www.amsterdam.nl/stelselpedia/hr-index/catalogus/persoon/niet-natuurlijk-pers/',
  },
  VESTIGING: {
    ABBR: 'ves',
    NAME: 'Vestiging',
    STELSELPEDIA_LINK: '//www.amsterdam.nl/stelselpedia/hr-index/catalogus/vestiging/',
  },
};
export const LOAD_BAG_DATA = `${scope}/LOAD_BAG_DATA`;

export const LOAD_NUMMERAANDUIDING_DATA = `${scope}/LOAD_NUMMERAANDUIDING_DATA`;
export const LOAD_NUMMERAANDUIDING_DATA_SUCCESS = `${scope}/LOAD_NUMMERAANDUIDING_SUCCESS`;
export const LOAD_NUMMERAANDUIDING_DATA_FAILED = `${scope}/LOAD_NUMMERAANDUIDING_FAILED`;

export const LOAD_PAND_DATA = `${scope}/LOAD_PAND_DATA`;
export const LOAD_PAND_DATA_SUCCESS = `${scope}/LOAD_PAND_DATA_SUCCESS`;
export const LOAD_PAND_DATA_FAILED = `${scope}/LOAD_PAND_DATA_FAILED`;

export const LOAD_PANDLIST_DATA = `${scope}/LOAD_PANDLIST_DATA`;
export const LOAD_PANDLIST_DATA_SUCCESS = `${scope}/LOAD_PAND_DATALIST_SUCCESS`;
export const LOAD_PANDLIST_DATA_FAILED = `${scope}/LOAD_PAND_DATALIST_FAILED`;
export const LOAD_PANDLIST_DATA_NO_RESULTS = `${scope}/LOAD_PANDLIST_DATA_NO_RESULTS`;

export const LOAD_KADASTRAAL_OBJECT_DATA = `${scope}/LOAD_KADASTRAAL_OBJECT_DATA`;
export const LOAD_KADASTRAAL_OBJECT_DATA_SUCCESS = `${scope}/LOAD_KADASTRAAL_OBJECT_DATA_SUCCESS`;
export const LOAD_KADASTRAAL_OBJECT_DATA_FAILED = `${scope}/LOAD_KADASTRAAL_OBJECT_DATA_FAILED`;
export const LOAD_KADASTRAAL_OBJECT_DATA_NO_RESULTS = `${scope}/LOAD_KADASTRAAL_OBJECT_DATA_NO_RESULTS`;

export const LOAD_KADASTRAAL_SUBJECT_DATA = `${scope}/LOAD_KADASTRAAL_SUBJECT_DATA`;
export const LOAD_KADASTRAAL_SUBJECT_DATA_SUCCESS = `${scope}/LOAD_KADASTRAAL_SUBJECT_DATA_SUCCESS`;
export const LOAD_KADASTRAAL_SUBJECT_DATA_FAILED = `${scope}/LOAD_KADASTRAAL_SUBJECT_DATA_FAILED`;
export const LOAD_KADASTRAAL_SUBJECT_DATA_NO_RESULTS = `${scope}/LOAD_KADASTRAAL_SUBJECT_DATA_NO_RESULTS`;

export const LOAD_VERBLIJFSOBJECT_DATA = `${scope}/LOAD_VERBLIJFSOBJECT_DATA`;
export const LOAD_VERBLIJFSOBJECT_DATA_SUCCESS = `${scope}/LOAD_VERBLIJFSOBJECT_DATA_SUCCESS`;
export const LOAD_VERBLIJFSOBJECT_DATA_FAILED = `${scope}/LOAD_VERBLIJFSOBJECT_DATA_FAILED`;

export const LOAD_VESTIGING_DATA = `${scope}/LOAD_VESTIGING_DATA`;
export const LOAD_VESTIGING_DATA_SUCCESS = `${scope}/LOAD_VESTIGING_DATA_SUCCESS`;
export const LOAD_VESTIGING_DATA_FAILED = `${scope}/LOAD_VESTIGING_DATA_FAILED`;
export const LOAD_VESTIGING_DATA_NO_RESULTS = `${scope}/LOAD_VESTIGING_DATA_NO_RESULTS`;
