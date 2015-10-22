(function() {
  module.exports = function(robot) {

    var Regexp = require('../lib/regexp.js');
    var reg = new Regexp(robot.name);

    var datestamp = /^\d{8}$/;

    var parse = function(parts) {
      var text = null;
      var name = null;
      var date = null;
      if (parts.length == 1) {
        if (datestamp.test(parts[0])) {
          date = parts[0];
        } else {
          name = parts[0]
        }
      } else if (parts.length == 2 && datestamp.test(parts[1])) {
        date = parts[1];
        name = parts[0]
      } else {
        text = parts.join(' ');
      }
      return {
        text: text,
        name: name,
        date: date
      }
    }

    robot.hear(reg.exp('!standup(\\s?(.*))', 'i'), function(res) {
      var parts = parse(res.match[3]?res.match[3].split(' '):'');
      console.log(parts);
    });

  }

}).call(this);
