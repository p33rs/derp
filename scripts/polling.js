return;
(function() {
    module.exports = function(robot) {

        var Regexp = require('../lib/regexp.js');
        var reg = new Regexp(robot.name);
        var Auth = require('../lib/auth.js');
        var auth = new Auth();
        var Poll = require('../lib/poll.js');

        var durationMin = 1;
        var durationMax = 60;

        var polls = {};

        robot.hear(reg.exp('!(rtv|vote)(( \\+(\\d+))? (.*) (\\\\.*)+)?'), function(res) {
            var duration = 10;
            if (!res.match[3]) {
                if (!polls[res.message.room]) {
                    return;
                }
                return res.reply(':eng101: ' + polls[res.message.room].responses());
            }
            if (res.match[5]) {
                duration = res.match[5];
            }
            var question = res.match[6];
            var choices = res.match[7].split('\\');
            var empty = /^\s*$/;
            for (var i = 0; i < choices.length; i++) {
                if (empty.test(choices[i])) {
                    choices.splice(i--, 1);
                }
            }
            if (choices.length < 2) {
                return res.reply(':unamused: bro, you need to vote on at least two things');
            }
            if (duration < 1 || duration > 60) {
                return res.reply(
                    ':popo: the min duration is ' + durationMin.toString() + ' and the max duration is ' + durationMax.toString()
                );
            }
            // create the poll

        });

        robot.hear(reg.exp('!vote (\\d+)$'), function(res) {
            if (!polls[res.message.room]) {
                return res.reply(
                    ':smirk: There isn\'t a poll on right now.'
                );
            }
            var poll = polls[res.message.room];
            if (!poll.getOption(res.match[2])) {
                return robot.messageRoom(
                    res.message.user.name,
                    ':confused: That wasn\'t an options.'
                );
            }
            poll.addVote(res.match[2], res.message.user.name);
            return robot.messageRoom(
                res.message.user.name, ':usa: Your vote for ' + poll.getOption(res.match[2]) + ' was counted.'
            );

        });

    }

}).call(this);
