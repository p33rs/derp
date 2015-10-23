module.exports = function() {
    var fs = require('fs');
    var moment = require('moment')
    var jsonfile = require('jsonfile');
    var filenamePattern = '/home/jon/hubot/storage/standup-:date.json';
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
                    console.log('fs error while getting standup');
                }
            }
            return current;
        }
    };
};
