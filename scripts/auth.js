(function() {
  module.exports = function(robot) {
    var Auth = require('../lib/auth.js');
    var auth = new Auth();
    robot.hear(/!admin (.*)/i, function(res) {
        var target = res.match[1];
        if (auth.isAdmin(res.message.room) && auth.isAdmin(res.message.user.name)) {
            auth.addAdmin(res.match[1]);
            return res.reply(':keke: u got it');
        } else {
            console.log(res.message.user.name + ' attempted to add ' + target + ' as an admin.');
        }
    });
  }

}).call(this);
