/* eslint-disable no-param-reassign */

import fetch from 'isomorphic-fetch';

/**
* @author Christopher M. Cook <ccook@sapient.com>
* @description A function that will prevent indefinitely stalled network requests from hanging up the application.  See https://github.com/github/fetch/issues/175#issuecomment-125779262.
* @param {number} maxTimeout - The number of milliseconds tow wait before assuming a network request has timed out.
* @param {promise} promise - The promise to execute, which will be rejected after the specified amount of time if it hasn't yet resolved.
* @returns {promise} - Returns the original promise if maxTimeout is not greater than zero otherwise it returns a new promise that will resolve to the promise passed in.
*/
function fetchMaxTimeout(maxTimeout, promise) {
  if (maxTimeout > 0) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        reject(new Error('Request timed out'));
      }, maxTimeout);

      promise.then(resolve, reject);
    });
  }

  return promise;
}

export function getJSON2(url, maxTimeout) {
  // Default maxTimeout to 12 seconds to prevent application hangups.
  maxTimeout = maxTimeout > 0 ? maxTimeout : 12000;

  return fetchMaxTimeout(maxTimeout,
    fetch(url, {
      credentials: 'same-origin'
    }).then(response => {
      if (!response.ok) {
        throw Error(`Request rejected with status ${response.status}`);
      }

      const result = response.json();

      if (typeof result !== 'object') {
        throw Error('Request rejected with invalid format');
      }

      return result;
    }).catch(e => {
      return e;
    })
  );
}


export function getJSON(url, maxTimeout) {
  // Default maxTimeout to 12 seconds to prevent application hangups.
  maxTimeout = maxTimeout > 0 ? maxTimeout : 12000;

  return fetchMaxTimeout(maxTimeout,
    fetch(url, {
      credentials: 'same-origin'
    }).then(response => {
      if (response.status >= 400) {
        return new Error(`An error was encountered while making the request. response.status = ${response.status}`);
      }
      return response.json();
    }).catch(e => {
      return e;
    })
  );
}

export function getHeaders(url) {
  return (
    fetch(url, {
      credentials: 'same-origin'
    }).then(response => {
      if (response.status >= 400) {
        return new Error(`An error was encountered while making the request. response.status = ${response.status}`);
      }
      return response.headers;
    }).catch(e => {
      return e;
    })
  );
}


export function getHTML(url, maxTimeout) {
  // Default maxTimeout to 12 seconds to prevent application hangups.
  maxTimeout = maxTimeout > 0 ? maxTimeout : 12000;

  return fetchMaxTimeout(maxTimeout,
    fetch(url, {
      credentials: 'same-origin'
    }).then(response => {
      if (response.status >= 400) {
        return new Error(`An error was encountered while making the request. response.status = ${response.status}`);
      }
      return response.text();
    }).catch(e => {
      return e;
    })
  );
}

export function postJSON(url, data) {
  return (
    fetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  );
}

export function postJSONgetJSON(url, data, maxTimeout) {
  // Default maxTimeout to 12 seconds to prevent application hangups.
  maxTimeout = maxTimeout > 0 ? maxTimeout : 12000;

  return fetchMaxTimeout(maxTimeout,
    fetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(data)
    }).then(response => {
      if (response.status >= 400) {
        return new Error(`An error was encountered while making the request. response.status = ${response.status}`);
      }
      return response.json();
    }).catch(e => {
      return e;
    })
  );
}


export function getXML(url, maxTimeout) {
  // Default maxTimeout to 12 seconds to prevent application hangups.
  maxTimeout = maxTimeout > 0 ? maxTimeout : 12000;

  return fetchMaxTimeout(maxTimeout,
    fetch(url, {
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/xml',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      }
    }).then(response => {
      if (response.status >= 400) {
        return new Error(`An error was encountered while making the request. response.status = ${response.status}`);
      }
      return response.text();
    }).catch(e => {
      return e;
    })
  );
}
