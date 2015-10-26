(function() {
    module.exports = function(robot) {
        var Auth = require('../lib/auth.js');
        var auth = new Auth();
        var c = require('cli-color');
        robot.hear(/!admin (.*)/i, function(res) {
            var target = res.match[1];
            if (auth.isAdmin(res.message.room) && auth.isAdmin(res.message.user.name)) {
                auth.addAdmin(res.match[1]);
                console.log(
                    c.xterm(120)(res.message.user.name) + ' adminned ' + target
                );
                return res.reply(':keke: u got it');
            } else {
                console.log(
                    c.xterm(202)(res.message.user.name) + ' tried to admin ' + target
                );
            }
        });
    }

}).call(this);
