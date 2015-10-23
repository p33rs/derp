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

        robot.hear(reg.exp('/giphy', 'i'), function(res) {
            var user = res.message.user.name;
            console.log(user + ' posted a giphy.');
            var current = {}
            if (fs.existsSync(filename)) {
                try {
                    current = jsonfile.readFileSync(filename);
                } catch (e) {
                    console.log('fs error while getting giphy records');
                }
            }
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

  }

}).call(this);
