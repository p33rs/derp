(function() {
    module.exports = function(robot) {

        var Scoreboard = require('../lib/scoreboard.js');
        var scoreboard = new Scoreboard();
        var Auth = require('../lib/auth.js');
        var auth = new Auth();
        var Regexp = require('../lib/regexp.js');
        var reg = new Regexp(robot.name);
        var c = require('cli-color');

        var aliases = {
            'nick.obrien': ':nob:',
            'brendan': ':brendan:',
            ':nadnerb:': ':brendan:',
            ':sem:': 'sam',
            'chirag': 'guns',
            'nathantruman': ':dogman:',
            'dogman': ':dogman:'
        }

        var emot = function(score) {
            switch (true) {
                case score >= 100: return ':usa:';
                case score >= 75: return ':godbless:';
                case score >= 50: return ':monocle:';
                case score >= 25: return ':doge:';
                case score >= 20: return ':dance:';
                case score >= 15: return ':toot:';
                case score >= 10: return ':golfclap:';
                case score >= 5: return ':grin:'
            }
            return ':simple_smile:'
        }

        robot.hear(reg.exp('\\+1 \\s*\\@?(.+?)\\s*( for .+)?$'), function(res) {
            var target = res.match[2];
            if (target.length > 64) {
                return res.reply(':neutral_face: tl;dr, not counting')
            }
            target = target.toLowerCase();
            if (aliases.hasOwnProperty(target)) {
                target = aliases[target];
            }
            var score = scoreboard.add(target.toLowerCase());
            console.log(c.xterm(120)(res.message.user.name) + ' upvoted ' + target);
            if (target === 'derp') {
                return res.reply(':blush: thanks! i have ' + score.toString() + ' points now.');
            }
            return res.reply(
                emot(score) + ' ' + target + ' now has ' + score.toString() + ' points.'
            );
        });

        robot.hear(reg.exp(robot.name + ' set (.+) (\\d+)', 'i'), function(res) {
            var score = scoreboard.set(res.match[2], res.match[3]);
            if (!auth.isAdmin(res.message.user.name)) {
                return;
            }
            console.log(c.xterm(120)(res.message.user.name) + ' forced ' + res.match[2] + ' to ' + res.match[3]);
            return res.reply(
                emot(score) + ' ' + res.match[2] + ' now has ' + score.toString() + ' points.'
            );
        });

        robot.hear(reg.exp(robot.name + ' get\\s?(.+)', 'i'), function(res) {
            var thing = res.match[2] ? res.match[2] : res.message.user.name;
            var score = scoreboard.get(thing);
            console.log(c.xterm(120)(res.message.user.name) + ' requested ' + thing);
            return res.reply(
                emot(score) + ' ' + res.match[2] + ' now has ' + score.toString() + ' points.'
            );
        });

        robot.hear(reg.exp(robot.name + ' top\\s?(\\d+)?', 'i'), function(res) {
            var score = scoreboard.get();
            var tuples = [];
            for (var key in score) {
                tuples.push([
                    key,
                    score[key]
                ]);
            }
            tuples.sort(function(a, b) {
                a = a[1];
                b = b[1];
                return a > b ? -1 : (a < b ? 1 : 0);
            });

            var userLimit = parseInt(res.match[2],10);
            var limit = userLimit && userLimit <= 15 ? userLimit : 5;
            var result = ':eng101: The winners are: ';
            for (var i = 0; i < tuples.length && i < limit; i++) {
                result += tuples[i][0] + ' (' + parseInt(tuples[i][1], 10) + ') ';
            }

            if (tuples.length > 5) {
                // result += 'and the loser is ' + tuples[tuples.length - 1][0] + ' (' + parseInt(tuples[tuples.length - 1][1], 10) + ') ';
            }

            console.log(c.xterm(120)(res.message.user.name) + ' requested top');
            return res.reply(result);
        });

    }

}).call(this);
