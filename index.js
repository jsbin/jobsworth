var config = require('./config');

var zmq = require('zmq');
var socket = zmq.socket('pull');
var Promise = require('rsvp').Promise;
socket.connect(config.port);

var dropbox = require('jsbin-dropbox-sync');

function parse(string) {
  return new Promise(function (resolve, reject) {
    resolve(JSON.parse(string));
  });
}

socket.on('message', function (buffer) {
  parse(buffer.toString()).then(function (data) {
    if (data.type === 'dropbox') {
      dropbox.process(data); // whatevs...
    }
  }).catch(function () {
    console.error('invalid message: ' + buffer.toString());
  });
});

dropbox(socket, config);
