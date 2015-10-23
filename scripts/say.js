(function() {
    module.exports = function(robot) {

        var figlet = require('figlet');
        var Auth = require('../lib/auth.js');
        var auth = new Auth();
        var Regexp = require('../lib/regexp.js');
        var reg = new Regexp(robot.name);

        robot.hear(reg.exp('say (\\S+) (.*)', 'i'), function(res) {
            // must be pm from admin
            if (!auth.isAdmin(res.message.user.name) || res.message.user.name !== res.message.room) {
                return;
            }
            var dest = res.match[2];
            var msg = res.match[3];
            console.log(res.message.user.name + ', to ' + dest + ': ' + msg);
            return robot.messageRoom(dest, msg);
        });

      robot.hear(reg.exp('say(s|m|l|b) @?(\\S+) (.*)', 'i'), function(res) {
          // must be pm from admin
          if (!auth.isAdmin(res.message.user.name) || res.message.user.name !== res.message.room) {
              return;
          }
          var dest = res.match[3];
          var msg = res.match[4];
          var fonts = {
              s: 'Mini',
              m: 'Ivrit',
              l: 'Roman',
              b: 'Sub-Zero'
          };
          console.log(res.message.user.name + ', to ' + dest + ' (' + fonts[res.match[2]] + '): ' + msg);
          var msgFormatted = '```\n' + figlet.textSync(msg, {font: fonts[res.match[2]]}) + '\n```';
          return robot.messageRoom(dest, msgFormatted);
      });

    }

}).call(this);
