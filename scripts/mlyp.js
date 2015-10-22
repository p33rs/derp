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
        robot.hear(/((is|are) (seriously |literally )?(bad|terrible|awful|the worst)|sucks?).?\S*$/i, function(res) {
            if (
                blacklist.indexOf(res.message.user.name) !== -1
                || (whitelist.length && whitelist.indexOf(res.message.user.name) === -1)) {
                return;
            }
            return res.reply(':dance: much like your posting');
        });
    }
}).call(this);
