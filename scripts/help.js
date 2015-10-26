(function() {
    module.exports = function(robot) {

        var Auth = require('../lib/auth.js');
        var auth = new Auth();
        var Regexp = require('../lib/regexp.js');
        var reg = new Regexp(robot.name);
        robot.hear(reg.exp('!help\\s?(\\S+)$', 'i'), function(res) {
            var target = (res.match[2] && auth.isAdmin(res.message.user.name))
                ? res.match[2]
                : res.message.user.name;
            var doc = [
                target, // DO NOT REMOVE
                ':smile: Hi! Most commands work in chat and in private.',
                'You can upvote things with `+1`. You can say `derp get <thing>` to retrieve a score, or `derp top` to see winners.',
                // 'To create a poll, say `!vote <thing>` and then a list of options. Each option should start with a backslash. Like:',
                // '`!vote Who is the best pop artist? \\Taylor Swift\\Taylor Swift\\Also Taylor Swift`',
                // 'Votes last ten minutes by default, but you can specify a time like this: ',
                // '`!vote +30 Question \\Answer\\Answer` :arrow_left: Set a 30 minute timer',
                // 'You\'ll receive more info on polls when you create one.',
                '`!standup <text>` will let you record your plans for the day. `!standup` alone will tell you who\'s already checked in.',
                '`!standup <name>` will PM you that user\'s standup for the day. You can also say `!standup all`.',
                '`!form` will get you a link to the office request form.',
                '`!roll` to roll dice. If you want, you can roll multiple dice using RPG notation: `!roll 2d12`',
                '`!giphy`, optionally specifying a username (`!giphy jon`), to see who abuses giphy the most.',
                '`!help` displays this message.'
            ];
            if (auth.isAdmin(target)) {
                doc.push(
                    ':toot: _Hey,_ aren\'t you special? Someone gave you admin privs, so you can also ...',
                    '`say <dest> <text>` to send messages to channels or other users',
                    '`derp set <thing> <score>` to manually adjust the scoreboard. People will see you doing this, so don\'t abuse it.',
                    '`!help <name>` to send this message to others.'
                );
            }
            doc.push(':speech_balloon: Send your questions, comments, requests, and complaints to @jon, who spends too much time on Slack.');
            return robot.messageRoom.apply(
                robot,
                doc
            );
        });

    }

}).call(this);
