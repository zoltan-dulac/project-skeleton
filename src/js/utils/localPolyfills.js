// This should contain polyfills needed in project that are not in a node module.

if (typeof document !== 'undefined' && typeof Element.prototype.matches !== 'function') {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.webkitMatchesSelector || function matches(selector) {
    const element = this;
    const elements = (element.document || element.ownerDocument).querySelectorAll(selector);
    let index = 0;

    while (elements[index] && elements[index] !== element) {
      ++index;
    }

    return Boolean(elements[index]);
  };
}

if (typeof document !== 'undefined' && typeof Element.prototype.closest !== 'function') {
  Element.prototype.closest = function closest(e) {
    for (let n = this; n;) {
      if (n.matches(e)) {
        return n;
      }
      n = 'SVGElement' in window && n instanceof SVGElement ? n.parentNode : n.parentElement;
    }
    return null;
  };
}
