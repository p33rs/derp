/**
 * Created by jonpierce on 10/23/15.
 */
(function() {
    module.exports = function(robot) {

        var Regexp = require('../lib/regexp.js');
        var reg = new Regexp(robot.name);
        var fs = require('fs');
        var jsonfile = require('jsonfile');
        var filename = '/home/jon/hubot/storage/giphy.json';

        var load = function() {
            var current = {}
            if (fs.existsSync(filename)) {
                try {
                    current = jsonfile.readFileSync(filename);
                } catch (e) {
                    console.log('fs error while getting giphy records');
                }
            }
            return current;
        };

        robot.hear(reg.exp('/giphy', 'i'), function(res) {
            var user = res.message.user.name;
            console.log(user + ' posted a giphy.');
            var current = load();
            if (current[user]) {
                current[user]++;
            } else {
                current[user] = 1;
            }
            jsonfile.writeFileSync(
                filename,
                current
            );
            return;
        });

        robot.hear(reg.exp('!giphy\\s?@?(\\S+)?', 'i'), function(res) {
            console.log(res.message.user.name + ' requested gif stats.');
            var current = load();
            if (res.match[2]) {
                return robot.messageRoom(
                    res.message.user.name,
                    res.match[2] + ' posted ' + (current[res.match[2]] ? current[res.match[2]] : 0).toString() + 'gifs.'
                );
            } else {
                var sorted = [];
                for (var user in current) {
                    sorted.push([
                        user,
                        current[user]
                    ]);
                }
                sorted.sort(function(a, b) {
                    a = a[1];
                    b = b[1];
                    return a > b ? -1 : (a < b ? 1 : 0);
                });
                return robot.messageRoom(
                    res.message.user.name,
                    sorted.map(function(v) {return v[0] + ' (' + v[1] + ')';}).join(', ')
                );
            }
        });

  }

}).call(this);
