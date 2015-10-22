(function() {
    module.exports = function(robot) {
        var maxDice = 20;
        var maxSides = 256;
        var Regexp = require('../lib/regexp.js');
        var reg = new Regexp(robot.name);
        robot.hear(reg.exp('!roll\\s?((\\d+)?d(\\d+))?$', 'i'), function(res) {
            var dice = 1;
            var sides = 6;
            if (res.match[3]) {
                dice = parseInt(res.match[3], 10);
            }
            if (res.match[4]) {
                sides = parseInt(res.match[4], 10)
            }
            if (dice < 1 || sides < 2 || dice > maxDice || sides > maxSides) {
                console.log(res.message.user.name + ' tried to roll a ' + dice.toString() + 'd' + sides.toString());
                return res.reply(':information_desk_person: Max dice is ' + maxDice.toString() + ', max sides is ' + maxSides.toString());
            }
            var result = ':game_die: Rolled ' + dice.toString() + 'd' + sides.toString() + ': ';
            for (var i = 0; i < dice; i++) {
                result = result + (Math.floor(Math.random() * sides) + 1).toString() + ' ';
            }
            console.log(result);
            return res.reply(result);
        });
    }
}).call(this);
