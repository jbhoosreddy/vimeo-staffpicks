/**
 * The purpose of this file is to provide a jQuery like API for performing tasks like
 * making AJAX calls, DOM interactions, cookie handling, Event Emitters, etc. (Experimental)
 * If you don't need all these features, they can be required individually.
 */
 const utils = {
  ajax: require("./ajax"),
  dom: new (require('./dom'))(),
  cookie: cookie = new (require("./cookie"))(),
  // worker: new Worker('/dist/worker.js')
};

// Node style event emitter decorated on 'utils' object.
require("./events").decorate(utils);
module.exports = utils;