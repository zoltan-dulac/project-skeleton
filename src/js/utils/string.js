/* eslint-disable no-console */

const _guidArr = [];
const _guidLookupTableArr = (() => {
  const guidLookupTableArr = [];
  for (let i = 0; i < 256; i++) {
    guidLookupTableArr[i] = (i < 16 ? '0' : '') + (i).toString(16);
  }
  return guidLookupTableArr;
})();
/**
* @author Christopher M. Cook <ccook@sapient.com>
* @description A function that will return a unique identifier (GUID).
* @param {string} [prefix] - (optional) A string that will prefix the generated guid.  Default is ''.
* @returns {string} - Returns a string representing a unique identifier.
* @example guid() = 'hello'
*/
export function guid(prefix) {
  prefix = prefix || '';

  const d0 = Math.random() * 0xffffffff | 0;
  const d1 = Math.random() * 0xffffffff | 0;
  const d2 = Math.random() * 0xffffffff | 0;
  const d3 = Math.random() * 0xffffffff | 0;

  let returnValue = prefix +
    _guidLookupTableArr[d0 & 0xff] +
    _guidLookupTableArr[d0 >> 8 & 0xff] +
    _guidLookupTableArr[d0 >> 16 & 0xff] +
    _guidLookupTableArr[d0 >> 24 & 0xff] +
    '-' +
    _guidLookupTableArr[d1 & 0xff] +
    _guidLookupTableArr[d1 >> 8 & 0xff] +
    '-' +
    _guidLookupTableArr[d1 >> 16 & 0x0f | 0x40] +
    _guidLookupTableArr[d1 >> 24 & 0xff] +
    '-' +
    _guidLookupTableArr[d2 & 0x3f | 0x80] +
    _guidLookupTableArr[d2 >> 8 & 0xff] +
    '-' +
    _guidLookupTableArr[d2 >> 16 & 0xff] +
    _guidLookupTableArr[d2 >> 24 & 0xff] +
    _guidLookupTableArr[d3 & 0xff] +
    _guidLookupTableArr[d3 >> 8 & 0xff] +
    _guidLookupTableArr[d3 >> 16 & 0xff] +
    _guidLookupTableArr[d3 >> 24 & 0xff];

  if (_guidArr.indexOf(returnValue) >= 0) {
    returnValue = guid(prefix);
  }

  _guidArr.push(returnValue);

  return returnValue;
}

/**
* @author Christopher M. Cook <ccook@sapient.com>
* @description A function that safely attempts to call JSON.parse() by using the supplied value.
* @param {object} v - The object to attempt to stringify.
* @returns {object|undefined} - If successful, returns an Object representing the supplied value, else returns undefined.
* @example jsonSafeParse(null) = undefined;
* @example jsonSafeParse('{"someKey":1}') = { someKey: 1 };
*/
export function jsonSafeParse(v) {
  let returnValue;

  if (!v) {
    // return undefined if value is not truthy before attempting to parse as JSON.
    return returnValue;
  }

  try {
    returnValue = JSON.parse(v.toString());
  } catch (ex) {
    console.warn(ex);
    returnValue = void 0;
  }

  return returnValue;
}

/**
 * @description Get global props from document if it's in the DOM.
 */
export function getGlobalProps() {
  let props = {};

  if (typeof(document) !== 'undefined') {
    const propsEl = document.getElementById('global-props');
    if (propsEl) {
      try {
        props = JSON.parse(propsEl.innerText);
      } catch (e) {
        console.error('Problem with props JSON.  See below.');
        console.error(e.message);
      }
    }
  }

  return props;
}
