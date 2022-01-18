/* eslint-disable no-param-reassign */

const _defaultNodeToIgnoreArr = [
  'audio',
  'br',
  'canvas',
  'iframe',
  'img',
  'input',
  'meta',
  'picture',
  'script',
  'source',
  'style',
  'sub',
  'sup',
  'textarea',
  'title',
  'track',
  'video'
];

/**
* @author Christopher M. Cook <ccook@sapient.com>
* @description A function that will return an (unique) Array of String representing DOM.nodeName values that will be used to ignore mutation events for those node types.  It will optionally accept a blacklistNodeArr and whitelistNodeArr (whitelist rules will be applied after blacklist rules).
* @param {array<string>} [blacklistNodeArr] - (optional) An Array of string (DOM.nodeName) values that will be ignored in mutation events (they will be included in the returned Array).  This is in addition to the default ignore values.
* @param {array<string>} [whitelistNodeArr] - (optional) An Array of String (DOM.nodeName) values that will not be ignored in mutation events (they will be excluded from the returned Array).
* @returns {array<string>} - Returns an array of lowercased String representing DOM nodeName values to ignore in DOM mutation events (whitelist and blacklist rules are applied to the default list of ignore values).
* @example getNodeToIgnoreArr()
* @example getNodeToIgnoreArr(['div'], ['sup'])
* @example getNodeToIgnoreArr([], ['sup'])
*/
export default function getNodeToIgnoreArr(blacklistNodeArr = [], whitelistNodeArr = []) {
  // Creates a copy of the original array, so as to not mutate the original instance.
  const nodeToIgnoreArr = _defaultNodeToIgnoreArr.map((q) => q.toLowerCase());

  blacklistNodeArr = (Array.isArray(blacklistNodeArr) ? blacklistNodeArr : []).map((q) => q.toString().toLowerCase());

  whitelistNodeArr = (Array.isArray(whitelistNodeArr) ? whitelistNodeArr : []).map((q) => q.toString().toLowerCase());

  Array.prototype.push.apply(nodeToIgnoreArr, blacklistNodeArr);

  whitelistNodeArr.forEach((whitelistNode) => {
    const whitelistNodeIndex = nodeToIgnoreArr.indexOf(whitelistNode);

    if (whitelistNodeIndex >= 0) {
      nodeToIgnoreArr.splice(whitelistNodeIndex, 1);
    }
  });

  // Return an array of unique values.
  return nodeToIgnoreArr.filter(function(q, i) { return this.indexOf(q) === i; }, nodeToIgnoreArr);
}
