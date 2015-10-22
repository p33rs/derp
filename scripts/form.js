(function() {
    module.exports = function(robot) {
        var Regexp = require('../lib/regexp.js');
        var reg = new Regexp(robot.name);
        robot.hear(reg.exp('!form$', 'i'), function(res) {
            return res.reply(
                ':clipboard: The office request form is at: http://www.emailmeform.com/builder/form/TOJqbWd8fREA'
            );
        });
    }
}).call(this);
