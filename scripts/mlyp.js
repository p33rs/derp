(function() {
    module.exports = function(robot) {
        var blacklist = [
            'ross',
            'jasongriffith'
        ];
        var whitelist = [
            'sam',
            'andrew',
            'brendan'
        ]; // lol!
        robot.hear(/((is|are) (seriously |literally )?(bad|terrible|awful|the worst)|sucks?).?\s*$/i, function(res) {
            if (
                blacklist.indexOf(res.message.user.name) !== -1
                || (whitelist.length && whitelist.indexOf(res.message.user.name) === -1)) {
                return;
            }
            return res.reply(':dance: much like your posting');
        });
        robot.hear(/(i've seen|i saw)/i, function(res) {
            return res.reply(':sheep: I\'ve seen things you people wouldn\'t believe.');
        });
    }
}).call(this);
