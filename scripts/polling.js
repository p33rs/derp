(function() {
  module.exports = function(robot) {

    var Regexp = require('../lib/regexp.js');
    var reg = new Regexp(robot.name);
    var Auth = require('../lib/auth.js');
    var auth = new Auth();

    var durationMin = 1;
    var durationMax = 60;

    robot.hear(reg.exp('!(rtv|vote)( \\+(\\d+))? (.*) (\\\\.*)+'), function(res) {
      var duration = 10;
      if (res.match[4]) {
        duration = res.match[4];
      }
      var question = res.match[5];
      var choices = res.match[6].split('\\');
      var empty = /^\s*$/;
      for (var i = 0; i < choices.length; i++) {
        if (empty.test(choices[i])) {
          choices.splice(i--, 1);
        }
      }
      if (choices.length < 2) {
        return res.reply(':reject: need to vote on at least one thing, yo');
      }
      if (duration < 1 || duration > 60) {
        return res.reply(
          ':reject: the min duration is ' + durationMin.toString() + ' and the max duration is ' + durationMax.toString()
        );
      }
    });

  }

}).call(this);
