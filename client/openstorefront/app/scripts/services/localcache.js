'use strict';

app.factory('localCache', function () {
  //Cross compatibility is provided by the sessionpolyfill.js file.
  var cache = null;
  if (window.sessionStorage) {
    cache = window.sessionStorage;
  } else if (window.localStorage) {
    cache = window.localStorage;
  } else {
    cache = localStorage;
  }

  /**
  * Stores the value into the cache.  Will convert objects to strings.
  * params: key -- a string value
  * params: value -- string or object.  If object, it is converted to string.
  */
  var save = function (key, value) {
    if (typeof key !== 'string') {
      throw new Error('Key must be a string');
    }
    if (typeof value === 'object') {
      if (value instanceof Date) {
        value = value.toString();
      } else {
        value = JSON.stringify(value);
      }
    }
    cache.setItem(key, value);
  };

  /**
  * Retrieves a value from the cache.
  * params: key -- string value
  * params: type -- optional parameter.  If it equals "object" a conversion to
  *         object will occur. "date" will convert it to a JS Date object.
  */
  var get = function (key, type) {
    if (typeof key !== 'string') {
      throw new Error('Key must be a string');
    }
    if ((typeof type !== 'undefined') && (type === 'object')) {
      return JSON.parse(cache.getItem(key));
    }
    if ((typeof type !== 'undefined') && (type === 'date')) {
      return new Date(cache.getItem(key));
    }
    return cache.getItem(key);
  };

  /**
  * Clears out all key/value pairs currently stored.
  * TODO:: Make this a bit less destructive, so that it only wipes I-Learn
  *       specific items.
  */
  var clearAll = function () {
    cache.clear();
  };

  /**
  * Wipes out one element from the cache.
  * params: key -- The specified element.
  */
  var clear = function (key) {
    if (typeof key !== 'string') {
      throw new Error('Key must be a string');
    } else {
      cache.removeItem(key);
    }
  };

  return {
    save:save,
    get:get,
    clearAll: clearAll,
    clear: clear
  };
});
