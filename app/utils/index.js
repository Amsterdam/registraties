const dateFields = ['begin_geldigheid', 'document_mutatie', 'einde_geldigheid', 'toestandsdatum', 'geboortedatum'];

export const isValidDate = (key, value) => value && dateFields.includes(key) && !Number.isNaN(Date.parse(value));

export const isObject = value => value && value.constructor && value.constructor.name === 'Object';

export const isArray = value =>
  value && value.constructor && value.constructor.name === 'Array' && typeof value[Symbol.iterator] === 'function';

// filter for keys by presence in a given list
export const isValidKey = keys => key => keys.includes(key);

// filter for valid property value
export const isValidValue = data => key =>
  !(
    data[key] &&
    data[key].constructor &&
    data[key].constructor.name === 'Object' &&
    (!data[key].omschrijving && !data[key].count)
  );

export const isCount = value => isObject(value) && value.count;
