var config = require("./config.json");
const pick = require("lodash/get");

function get(key) {
  return pick(config, key);
}

function isDevelopment() {
  console.log(process.env.NODE_ENV);
  console.log(process.env.NODE_ENV === "development");
  return process.env.NODE_ENV === "development";
}

function set(value) {
  config = value;
}

module.exports = {
  getValue: get,
  setValue: set,
  isDevelopment: isDevelopment,
};
