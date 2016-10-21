/** 
 * A simple utility to perform XMLHttpRequest calls.
 */

const get = function(url, data, options) {
  return new Promise(function (resolve, reject) {
    const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        // Check to resolve Promise only after the request is complete.
        if (this.readyState === 4) {
          resolve({ status: this.status, data: this.response });
        }
      }
      xhttp.open("GET", url + '?' + toQuery(data), true);
      xhttp.responseType = options.responseType || "";
      xhttp.send();
  });
};

const post = function(url, data, options) {
  return new Promise(function (resolve, reject) {
    const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        // Check to resolve Promise only after the request is complete.
        if (this.readyState === 4) {
          resolve({ status: this.status, data: this.response });
        }
      }
      // Necessary to provide 'Content-Type' to perform POST requests
      xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhttp.open("POST", url, true);
      xhttp.responseType = options.responseType || "";
      xhttp.send(toQuery(data));
  });
};

// A method to convert a simple object to a query (inspired by ruby/rails 'to_query')
const toQuery = function(object) {
  if (object == null || object == {}) {
    return "";
  }
  let result = '';
  for (let key in object) {
    // Prevent accessing predefined Object properties.
    if (object.hasOwnProperty(key)) {
      result += encodeURIComponent(key) + '=' + encodeURIComponent(object[key]) + '&';
    }
  }
  return result.slice(0, result.length - 1);
};

module.exports = {
  get,
  post
};