(function() {
    module.exports = function(robot) {

        var figlet = require('figlet');
        var Auth = require('../lib/auth.js');
        var auth = new Auth();
        var Regexp = require('../lib/regexp.js');
        var reg = new Regexp(robot.name);
        var c = require('cli-color');

        var fonts = {
            s: 'Mini',
            m: '4Max',
            l: 'Roman',
            b: 'Sub-Zero'
        };

        robot.hear(reg.exp('say(s|m|l|b)? @?(\\S+) (.*)', 'i'), function(res) {
            // must be pm from admin
            if (!auth.isAdmin(res.message.user.name) || res.message.user.name !== res.message.room) {
                return;
            }
            var font = res.match[2];
            var dest = res.match[3];
            var msg = res.match[4];
            var formatted = font
                ? '```\n' + figlet.textSync(msg, {font: fonts[font]}) + '\n```'
                : msg;
            console.log(
              c.xterm(120)(res.message.user.name)
              + ', to ' + dest
              + ' (' + ( font ? fonts[font] : 'plain' ) + '): '
              + msg
            );
            try {
                return robot.messageRoom(dest, formatted);
            } catch (e) {
                console.log(
                    c.xterm(202)('error') + ' failed sending to ' + dest + '. does that user exist?'
                );
            }
        });

    }

}).call(this);
