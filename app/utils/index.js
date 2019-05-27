import messages from 'containers/App/messages';
import { translationMessages } from '../i18n';

const dateFields = ['begin_geldigheid', 'document_mutatie', 'einde_geldigheid', 'toestandsdatum', 'geboortedatum'];
const currencyFields = ['koopsom'];

/**
 * Kadastraal object nummer regular expression
 */
export const reKadastraalObjectNr = /([A-Z]{3}\d{2})\s?([A-Z]{1,2})\s?(\d{4,5})\s?(A|G)\s?(\d{,4})/;

/**
 * Kadastraal object nummer regular expression with groups
 */
export const reKadastraalObjectNrGroups = /(?<gemeente>[A-Z]{3}\d{2})\s?(?<sectie>[A-Z]{1,2})\s?(?<objectNummer>\d{4,5})\s?(?<indexLetter>A|G)\s?(?<indexNummer>\d{,4})/;

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
const isValidKey = keys =>
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
const isValidValue = data =>
  /**
   * Checks if the value of the field with identifier `key` is either a primitive or is an object that has possible
   * readable values.
   *
   * @param {String} key - field key to match to the items in `keys`
   * @returns {Boolean}
   */
  key => {
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
const isCount = value => isObject(value) && value.count;

/**
 * (Dutch) postcode detector
 *
 * @param {Any} value
 * @returns {Boolean}
 */
const isPostCode = value => /^\d{4}[A-Z]{2}$/i.test(value);

/**
 * KVK field key detector
 *
 * @param {String} key
 * @returns {Boolean}
 */
const keyIsKVK = key => /^kvk/i.test(key);

/**
 * Currency detector
 *
 * @param {String} key
 * @param {Any} value
 * @returns {Boolean}
 */
const isCurrency = (key, value) => value && currencyFields.includes(key) && !Number.isNaN(value);

/**
 * Field key formatter
 * Replaces underscores with spaces and capitalizes the return value
 *
 * @param {String} key
 * @returns {String}
 */
const formatKey = key =>
  key
    .split('_')
    .map((part, index) => (index === 0 ? `${part.charAt(0).toUpperCase()}${part.slice(1)}` : part))
    .join(' ')
    .trim();

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
  const filteredKeys = keys ? objKeys.filter(isValidKey(keys)).filter(isValidValue(data)) : objKeys;
  const localeMessages = translationMessages[locale];

  return filteredKeys
    .map(key => {
      const value = data[key];
      let formattedValue;

      let type = isCurrency(key, value) ? 'currency' : typeof value;
      let readableKey = formatKey(key);

      if (keyIsKVK(key)) {
        readableKey = `${key.slice(0, 3).toUpperCase()}-${key.slice(3).replace('_', '')}`;
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
        } else if (type === 'string' || type === 'number' || type === 'currency') {
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
          const valueList = value.filter(isValidValue(value)).map(obj => obj.omschrijving);

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

export const isValidSubjectNP = ({ geboortedatum, naam }) => !!geboortedatum && !!naam;

export const isValidSubjectNNP = ({ kvknummer, rsin }) => !!kvknummer && !!rsin;

export const isAppartment = ({ indexletter }) => indexletter.toLowerCase() === 'a';
