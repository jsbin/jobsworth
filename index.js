var parseJSON = require('./lib/parseJSON');

var zmq = require('zmq');
var socket = zmq.socket('pull');

var tasks = {};

module.exports = {
  
  initialise: function (port) {
    socket.connect(port);
    socket.on('message', function (buffer) {
      parseJSON(buffer.toString()).then(function (data) {
        tasks[data.type](data);
      }).catch(function () {
        console.error('invalid message: ' + buffer.toString());
      });
    });
  },

  registerTask: function (name, fn) {
    if (tasks[name] !== undefined) {
      console.error('There is a task registered already with the name', name, '\n Overwriting the', name, 'task.');
    }
    tasks[name] = fn;
  }

};
