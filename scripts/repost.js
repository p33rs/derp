(function() {
    module.exports = function(robot) {
        var fs = require('fs');
        var jsonfile = require('jsonfile');
        var moment = require('moment');
        var filename = '/home/jon/hubot/storage/repost.json';

        robot.hear(/https?:\/\/\S+/i, function(res) {
            var url = res.match[0];
            var room = res.message.room;
            var poster = res.message.user.name;
            var current = {};
            if (fs.existsSync(filename)) {
                try {
                    current = jsonfile.readFileSync(filename);
                } catch (e) {
                    console.log('fs error while getting scores');
                }
            }

            // todo: track the most-shamed users
            if (current[room] && current[room][url]) {
                var repost = current[room][url];
                if (current[room][url].poster === poster) {
                    return;
                }
                console.log('repost-shaming ' + poster);
                return res.reply(
                    ':smirk: ' + repost.poster + ' posted that ' + moment(repost.time).fromNow() + '.'
                );
            }

            if (!current[room]) {
                current[room] = {};
            }
            current[room][url] = {
                poster: res.message.user.name,
                time: Date.now()
            }

            jsonfile.writeFileSync(filename, current);
        });

    }

}).call(this);
