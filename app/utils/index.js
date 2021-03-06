import messages from 'containers/App/messages';
import { translationMessages } from '../i18n';

const dateFields = [
  'begin_geldigheid',
  'document_mutatie',
  'einde_geldigheid',
  'toestandsdatum',
  'geboortedatum',
  'datum_aanvang',
];
const currencyFields = ['koopsom'];

/**
 * Finds the depth of an array and its values
 * When the given parameter isn't an array or it is an array, but it doesn't have any arrays as children, 0 is returned.
 *
 * @param  {Any} array - source object to find the depth off
 * @returns {Number}
 */
export const findArrayDepth = array => {
  let depth = 0;

  if (!isArray(array)) return depth;

  array.forEach(item => {
    if (isArray(item)) {
      depth = findArrayDepth(item) + 1;
    }
  });

  return depth;
};

/**
 * Object detector
 *
 * @param {Any} value
 * @returns {Boolean}
 */
export const isObject = value => !!value && value.constructor && value.constructor.name === 'Object';

/**
 * Array detector
 *
 * @param {Any} value
 * @returns {Boolean}
 */
export const isArray = value =>
  !!value && value.constructor && value.constructor.name === 'Array' && typeof value[Symbol.iterator] === 'function';

/**
 * Array of arrays detector
 *
 * @param {Any} value
 */
export const isArrayOfArrays = value =>
  !!value && isArray(value) && value.filter(Boolean).length > 0 && value.every(item => isArray(item));

/**
 * Date detector
 *
 * @param {String} key - field key to match to the items in `dateFields`
 * @param {Any} value
 * @returns {Boolean}
 */
export const isDate = (key, value) =>
  !!value && dateFields.includes(key) && !isArray(value) && !Number.isNaN(Date.parse(value));

/**
 * Valid key detector (curried function)
 *
 * @param {String[]} keys - list of field keys to match against
 * @returns {Function}
 */
export const isValidKey = keys =>
  /**
   * @param {String} key - field key to match to the items in `keys`
   * @returns {Boolean}
   */
  key => keys.includes(key);

/**
 * Valid value detector (curried function)
 *
 * @param {Object} data
 * @returns {Function}
 */
export const isValidValue = data =>
  /**
   * Checks if the value of the field with identifier `key` is either a primitive or is an object that has possible
   * readable values.
   *
   * @param {String} key - field key to match to the items in `keys`
   * @returns {Boolean}
   */
  key => {
    const hasOwnProperty = Object.prototype.hasOwnProperty.call(data, key);

    if (!hasOwnProperty) {
      return false;
    }

    const value = data[key];
    const valueIsObject = isObject(value);
    const readableKeys = ['omschrijving', 'count', 'kvk_adres', 'naam'];
    const hasReadableValue = valueIsObject && Object.keys(value).some(valueKey => readableKeys.includes(valueKey));

    return (!valueIsObject && value !== '') || hasReadableValue;
  };

/**
 * Object with key 'count' detector
 *
 * @param {Any} value
 * @returns {Boolean}
 */
export const isCount = value => isObject(value) && Object.prototype.hasOwnProperty.call(value, 'count');

/**
 * (Dutch) postcode detector
 *
 * @param {Any} value
 * @returns {Boolean}
 */
export const isPostCode = value => /^\d{4}\s?[A-Z]{2}$/i.test(value);

/**
 * Currency detector
 *
 * @param {String} key
 * @param {Any} value
 * @returns {Boolean}
 */
export const isCurrency = (key, value) =>
  !!value && currencyFields.includes(key) && !Number.isNaN(Number.parseInt(value, 10));

/**
 * Field key formatter
 * Replaces underscores with spaces and capitalizes the return value
 *
 * @param {String} key
 * @returns {String}
 */
export const formatKey = key =>
  key
    .split('_')
    .map((part, index) => (index === 0 ? `${part.charAt(0).toUpperCase()}${part.slice(1)}` : part))
    .join(' ')
    .trim();

/**
 * Checks if a field with a number value is a value that should not be formatted as a number. This is the case
 * for house numbers or years.
 *
 * @param   {String} key - field key to check
 * @returns {Boolean}
 */
const shouldBeStringValue = key => ['huisnummer', 'oorspronkelijk_bouwjaar'].includes(key);

/**
 * Checks if a field's value should be tranformed by the field type
 *
 * @param   {String} type - a field's type
 * @returns {Boolean}
 */
const isPlainValue = type => ['string', 'number', 'currency', 'surface'].includes(type);

/**
 * Returns a formatted dataset
 *
 * Will filter invalid keys and values out of the set, format values and apply translations to key values. A custom
 * type is set for each value in the dataset so that, when the value is rendered, the correct translation component
 * can be used to correctly display the value.
 *
 * @param {Object} options
 * @param {Object} options.data - key/value pairs
 * @param {String[]} options.keys - list of keys who's values are allowed to be returned
 * @returns {Object[]}
 */
export const formatData = ({ data, keys, locale = 'default' }) => {
  const objKeys = Object.keys(data);
  const parentKeys = [...new Set(keys.map(key => key.split('.')[0]))];
  const childKeys = {};

  if (keys) {
    keys
      .filter(key => key.split('.').length > 1)
      .forEach(key => {
        const [parent, child] = key.split('.');

        if (!childKeys[parent]) {
          childKeys[parent] = [];
        }
        childKeys[parent].push(child);
      });
  }

  const filteredKeys = keys ? objKeys.filter(isValidKey(parentKeys)).filter(isValidValue(data)) : objKeys;
  const localeMessages = translationMessages[locale];

  return filteredKeys
    .map(key => {
      const value = data[key];
      let formattedValue;

      let type = isCurrency(key, value) ? 'currency' : typeof value;
      let readableKey = formatKey(key);

      if (key.startsWith('kvk') || key.startsWith('sbi')) {
        readableKey = `${key.slice(0, 3).toUpperCase()}-${key.slice(3).replace('_', '')}`;
      }

      if (key === 'oppervlakte') {
        type = 'surface';
      } else if (shouldBeStringValue(key)) {
        type = 'string';
      }

      try {
        if (type === 'boolean') {
          formattedValue = value ? localeMessages[messages.yes.id] : localeMessages[messages.no.id];
        } else if (isDate(key, value)) {
          formattedValue = new Intl.DateTimeFormat(locale).format(new Date(value));
        } else if (isPostCode(value)) {
          formattedValue = `${value.slice(0, 4)} ${value.slice(-2).toUpperCase()}`;
        } else if (value === null) {
          type = 'boolean';
          formattedValue = localeMessages[messages.unknown.id];
        } else if (isPlainValue(type)) {
          formattedValue = value;
        } else if (isCount(value)) {
          type = 'number';
          readableKey = messages.amount_of;
          formattedValue = value.count;
        } else if (isObject(value)) {
          if (value.omschrijving || value.naam) {
            // Most values of type 'object' contain a value for the field with key 'omschrijving' or 'naam'. We use that as the
            // formatted value for the current field.
            formattedValue = value.omschrijving || value.naam;
          } else {
            // The vestiging endpoint result set contains nested objects. A recursive call to `formatData` returns those values
            return formatData({ data: value });
          }
        } else if (isArray(value)) {
          const valueList = value.map(obj => {
            if (obj.omschrijving || obj.name) {
              return obj.omschrijving || obj.naam;
            }

            return formatData({ data: obj, keys: childKeys[key] });
          });

          if (valueList.length) {
            formattedValue = valueList.length === 1 ? valueList[0] : valueList;
          }
        }
      } catch (e) {
        // In theory, we should never reach this point, but to be sure that we don't return an invalid value,
        // we return nothing at all.
        return null;
      }

      return {
        type,
        key,
        formattedKey: readableKey,
        value,
        formattedValue,
      };
    })
    .filter(Boolean);
};

const isNotEmptyString = val => Object.prototype.toString.call(val) === '[object String]' && val.toString().length > 0;

export const isValidSubjectNP = subjectNP =>
  isObject(subjectNP) && isNotEmptyString(subjectNP.geboortedatum) && isNotEmptyString(subjectNP.naam);

export const isValidSubjectNNP = subjectNNP =>
  isObject(subjectNNP) && isNotEmptyString(subjectNNP.kvknummer) && isNotEmptyString(subjectNNP.rsin);

export const isApartment = apartment =>
  isObject(apartment) && isNotEmptyString(apartment.indexletter) && apartment.indexletter.toLowerCase() === 'a';

export const isValidMaatschappelijkeActiviteit = maatschappelijkeActiviteit =>
  isObject(maatschappelijkeActiviteit) &&
  isNotEmptyString(maatschappelijkeActiviteit.kvk_nummer) &&
  isNotEmptyString(maatschappelijkeActiviteit.naam);

/**
 * Get id from end of URL
 *
 * @param {String} URL
 * @return {String}
 */
export const getIdFromURL = URL => {
  const isEmptyString = isNotEmptyString(URL) === false;

  if (isEmptyString) {
    return '';
  }

  const matches = URL.match(/.+\b(\d+)\/?$/);

  if (isArray(matches) && matches.length === 2) {
    return matches[1];
  }

  return '';
};
