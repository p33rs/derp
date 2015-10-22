(function() {
  module.exports = function(robot) {

    var Auth = require('../lib/auth.js');
    var auth = new Auth();
    var Regexp = require('../lib/regexp.js');
    var reg = new Regexp(robot.name);

    robot.hear(reg.exp('say (\\S+) (.*)', 'i'), function(res) {
      // must be pm from admin
      if (!auth.isAdmin(res.message.user.name) || res.message.user.name !== res.message.room) {
        return;
      }
      var dest = res.match[1];
      var msg = res.match[2];
      console.log(res.message.user.name + ', to ' + dest + ': ' + msg);
      return robot.messageRoom(dest, msg);
    });

  }

}).call(this);
