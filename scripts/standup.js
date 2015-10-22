(function() {
    module.exports = function(robot) {

        var Regexp = require('../lib/regexp.js');
        var reg = new Regexp(robot.name);
        var Standup = require('../lib/standup.js');
        var standup = new Standup();

        var datestamp = /^\d{8}$/;

        var parse = function(parts) {
            var text = null;
            var name = null;
            var date = null;
            if (parts.length == 1) {
                if (datestamp.test(parts[0])) {
                    date = parts[0];
                } else if (parts[0]) {
                    name = parts[0]
                }
            } else if (parts.length == 2 && datestamp.test(parts[1])) {
                date = parts[1];
                name = parts[0]
            } else if (parts.length) {
                text = parts.join(' ')
            }
            return {
                text: text,
                name: name,
                date: date
            }
        };

        robot.hear(reg.exp('!standup(\\s?(.*))', 'i'), function(res) {
            var params = parse(res.match[3]?res.match[3].split(' '):[]);
            if (params.text) {
                standup.save(res.message.user.name, params.text);
                return robot.messageRoom(
                    res.message.user.name,
                    'Thanks for checking in!'
                );
            } else if (params.name) {
                var data = standup.load(params.date);
                if (data[params.name]) {
                    return robot.messageRoom(
                        res.message.user.name,
                        'Standup for @' + data[params.name] + ': ' + data[params.name]
                    );
                } else {
                    return robot.messageRoom(
                        res.message.user.name,
                        'That user hasn\'t checked in yet today.'
                    );
                }
            } else {
                var data = standup.load();
                var users = [];
                for (var user in data) {
                    if (data.hasOwnProperty(user)) {
                        users.push(user);
                    }
                }
                if (users.length) {
                    return res.reply(
                        'The following users have checked in today: ' + users.join(', ') + '.'
                    );
                } else {
                    return res.reply(
                        '@channel, this morning\'s standup is under way.'
                    )
                }
            }
        });

    }

}).call(this);
