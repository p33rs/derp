(function() {
  module.exports = function(robot) {

    var Regexp = require('../lib/regexp.js');
    var reg = new Regexp(robot.name);
    var Auth = require('../lib/auth.js');
    var auth = new Auth();

    robot.hear(reg.exp('!(rtv|vote) (+(\\d+)) (.*) (\\\.*)+'), function(res) {
      console.log(res.match);
    });

  }

}).call(this);
