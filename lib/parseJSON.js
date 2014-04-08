var Promise = require('rsvp').Promise;

function parseJSON(string) {
  return new Promise(function (resolve) {
    resolve(JSON.parse(string));
  });
}

module.exports = parseJSON;
