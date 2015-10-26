module.exports = function() {
    var fs = require('fs');
    var jsonfile = require('jsonfile');
    var filename = '/home/jon/hubot/storage/scores.json';
    var c = require('cli-color');
    return {
        add: function(name) {
            var current = this.get();
            if (current && current[name]) {
                current[name] = current[name] + 1;
            } else {
                current[name] = 1;
            }
            this.save(current);
            return current[name];
        },
        set: function(name, value) {
            var current = this.get();
            current[name] = parseInt(value, 10);
            this.save(current);
            return value;
        },
        get: function(name) {
            var current = {}
            if (fs.existsSync(filename)) {
                try {
                    current = jsonfile.readFileSync(filename);
                } catch (e) {
                    console.log(
                        c.xterm(202)('error') + ' while getting scores'
                    );
                }
            }
            if (name && current[name]) {
                return current[name];
            } else if (name) {
                return 0;
            }
            else if (current) {
                return current;
            }
            return {};
        },
        save: function(data) {
            jsonfile.writeFileSync(filename, data);
        }
    };
};
