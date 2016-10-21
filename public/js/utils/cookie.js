/**
 * A Cookie class to handle simple cookie handling operations.
 */
const Cookie = function(context) {
  this._context = context || document;
  if (!this._context) {
    throw new ReferenceError('Module needs to be initialized properly with a context.');
  }
  return this;
}

Cookie.prototype.set = function(name, value, expiration) {
  const context = this._context;
  if (typeof expiration !== "number") {
    expiration = 1;
  }
  const date = new Date();
  date.setTime(date.getTime() + (expiration*24*60*60*1000));
  const expires = "expires=" + date.toUTCString();
  context.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';' + expires + ";path=/";
};

Cookie.prototype.get = function(name) {
  const context = this._context;
  const cname = encodeURIComponent(name) + '=';
  const cookie = context.cookie ? context.cookie.split(';') : null;
    if (cookie) {
      for(let i = 0; i < cookie.length; i++) {
        let c = cookie[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return decodeURIComponent(c.substring(cname.length, c.length));
          }
      }
      return '';
    }
    return '';
};

module.exports = Cookie;