import localforage from 'localforage';

/**
 * @param {String} key
 * @param {Any} data
 * @param {Number} [lifetime=320000000] - 12 hours cache lifetime
 */
export function* storeItem(key, data, lifetime = 320000000) {
  yield localforage.setItem(key, { lifetime, data, date: Date.now() });
  const storedItem = yield localforage.getItem(key);

  return storedItem.data;
}

export function* fetchItem(key) {
  const cacheItem = yield localforage.getItem(key);

  if (!cacheItem) {
    return undefined;
  }

  const { lifetime, data, date } = cacheItem;

  if (date + lifetime <= Date.now()) {
    yield localforage.removeItem(key);
  }

  return data;
}
