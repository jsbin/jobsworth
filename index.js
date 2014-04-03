var config = require('./config');

var zmq = require('zmq');
var socket = zmq.socket('pull');
socket.connect(config.port);

var dropbox = require('jsbin-dropbox-sync');
dropbox(socket, config);
