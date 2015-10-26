module.exports = function() {
    var fs = require('fs');
    var moment = require('moment')
    var jsonfile = require('jsonfile');
    var filenamePattern = '/home/jon/hubot/storage/standup-:date.json';
    var c = require('cli-color');
    return {
        save: function(name, text) {
            var current = this.load();
            if (current[name]) {
                current[name] = current[name] + '; ' + text;
            } else {
                current[name] = text;
            }
            jsonfile.writeFileSync(
                filenamePattern.replace(':date', moment().format('YYYYMMDD')),
                current
            );
        },
        load: function(date) {
            if (!date) {
                date = moment().format('YYYYMMDD');
            }
            var filename = filenamePattern.replace(':date', date);
            var current = {}
            if (fs.existsSync(filename)) {
                try {
                    current = jsonfile.readFileSync(filename);
                } catch (e) {
                    console.log(
                        c.xterm(202)('error') + ' while getting standup'
                    );
                }
            }
            return current;
        }
    };
};
