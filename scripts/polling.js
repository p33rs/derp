(function() {
  module.exports = function(robot) {

    var Regexp = require('../lib/regexp.js');
    var reg = new Regexp(robot.name);
    var Auth = require('../lib/auth.js');
    var auth = new Auth();

    robot.hear(reg.exp('!(rtv|vote)( \\+(\\d+))? (.*) (\\\\.*)+'), function(res) {
      var duration = 10;
      if (res.match[4]) {
        duration = res.match[4];
      }
      var question = res.match[5];
      var choices = res.match[6].split('\\');
      console.log(duration);
      console.log(question);
      console.log(choices);
    });

  }

}).call(this);
