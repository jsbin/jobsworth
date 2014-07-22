var util = require('util');
var parseJSON = require('./lib/parseJSON');

var zmq = require('zmq');
var socket = zmq.socket('pull');

var tasks = {};

module.exports = {
  
  initialise: function (port) {
    socket.connect(port);
    socket.on('message', function (buffer) {
      parseJSON(buffer.toString()).then(function (data) {
        if (tasks[data.type]) {
          util.log(util.format('Jobsworth:: ' + data.type + ': ' + '%j', data));
          tasks[data.type](data);
        } else {
          util.log('Jobsworth:: Unregistered Task: ' + data.task);
        }
      }).catch(function () {
        util.log('Jobsworth:: Invalid Message: ' + buffer.toString());
      });
    });
  },

  registerTask: function (name, fn) {
    if (tasks[name] !== undefined) {
      util.log('Jobsworth:: Already registered task: ' + name + ' - overwriting the ' + name + 'task');
    }
    tasks[name] = fn;
  }

};
