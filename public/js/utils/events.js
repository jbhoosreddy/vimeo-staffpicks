/**
 * A barebones implementation of the EventEmitter module in node.
 * Slight modified with a very handy decorate method.
 */

function EventEmitter() {
  this._events = this._events || {};
}

EventEmitter.prototype.on = function(type, listener) {

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  if (!this._events[type]) {
    this._events[type] = [];
    this._events[type].push(listener);
  }
  else {
    this._events[type].push(listener);
  }
  return this;
};


EventEmitter.prototype.emit = function(type) {

  if (!this._events)
    this._events = {};

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    if (arguments.length == 1) {
      handler.call(this);
    }
    else {
      args = Array.prototype.slice.call(arguments, 1);
      handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    for (i = 0; i < listeners.length; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.off = function(type, listener) {

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  for (i = length; i-- > 0;) {
    if (list[i] === listener ||
        (list[i].listener && list[i].listener === listener)) {
      position = i;
      break;
    }
  }

  if (position < 0)
    return this;
  else {
    list.splice(position, 1);
  }
  return this;
};

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var executed = false;

  function callonce() {
    this.off(type, callonce)
    if(!executed) {
      executed = true;
      listener.apply(this, arguments);
    }
  }
  callonce.listener = listener;
  this.on(type, callonce);

  return this;
};

// Decorate an object with event emitter functionality.
// See: https://dxr.mozilla.org/mozilla-central/source/devtools/shared/event-emitter.js
EventEmitter.decorate = function (objectToDecorate) {
  let emitter = new EventEmitter();
  objectToDecorate.on = emitter.on.bind(emitter);
  objectToDecorate.off = emitter.off.bind(emitter);
  objectToDecorate.once = emitter.once.bind(emitter);
  objectToDecorate.emit = emitter.emit.bind(emitter);
};

function isFunction(arg) {
  return typeof arg == 'function';
}

function isUndefined(arg) {
  return arg == undefined;
}

function isObject(arg) {
  return typeof arg == 'object'
}

module.exports = EventEmitter;