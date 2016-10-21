const DOM = function(context) {
  // For most cases, context would be document only.
  this._context = context || document;
  if (!this._context) {
    throw new ReferenceError('Module needs to be initialized properly with a context.');
  }
  return this;
}

DOM.prototype.get = function(selector) {
  const context = this._context;
  if (selector.startsWith('#')) {
    return context.getElementById(selector.slice(1));
  } else if (selector.startsWith('.')) {
    return context.getElementsByClassName(selector.slice(1));
  } else {
    return context.getElementsByTagName(selector);
  }
};

module.exports = DOM;