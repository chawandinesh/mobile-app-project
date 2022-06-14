import { fiveMins } from '../utils/constants';

/**
 * todo move out of hooks as it isn't a hook
 * maybe need a config for different storage times
 * may get complicated as we need different caches
 * so maybe a class is the best way to do this
 */
class Storage {
  constructor(storageTime = fiveMins) {
    this.defaultStorageTime = storageTime;
  }

  /**
   * check if the key exists on sessionStorage
   * @param key
   * @return {boolean}
   */
  has(key) {
    return !!window.sessionStorage.getItem(key);
  }

  /**
   *
   * @param {string} key - name of the key to be retrieved
   * @return {string}
   */
  get(key) {
    const toReturn = window.sessionStorage.getItem(key);
    return toReturn && JSON.parse(toReturn);
  }

  /**
   *
   * @param key
   * @param value
   * @param cacheTime
   */
  set(key, value, cacheTime) {
    const now = Date.now();
    const cacheLimit = cacheTime
      ? now + cacheTime
      : now + this.defaultStorageTime;

    const toSet = JSON.stringify({
      setTime: now,
      cacheLimit,
      value
    });

    window.sessionStorage.setItem(key, toSet);
  }

  /**
   * removes an item from sessionStorage
   * @param key - key to remove from sessionStorage
   */
  remove(key) {
    window.sessionStorage.removeItem(key);
  }

  /**
   * resets session storage to {}
   */
  clear() {
    window.sessionStorage.clear();
  }

  length() {
    return window.sessionStorage.length;
  }

  /**
   * used to check if a key should be updated
   * IMPORTANT! if key does exist return true so we know to update/add it
   * checks if the storage keys cacheLimit has expired
   * @param {string} key
   * @return {boolean}
   */
  shouldUpdateCache(key) {
    if (!this.has(key)) {
      return true;
    }

    const cached = this.get(key);
    return Date.now() > cached.cacheLimit;
  }

  /**
   * returns cached item if exists and cache limit is still valid
   * else returns false
   * @param key
   * @returns {*|boolean}
   */
  getValidCache(key) {
    const cached = this.get(key);
    return cached && Date.now() < cached.cacheLimit ? cached.value : false;
  }
}

const getStorageInstance = (storageDuration = fiveMins) => {
  const instance = new Storage(storageDuration);
  return instance;
};

export { Storage, getStorageInstance };
