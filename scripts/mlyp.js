(function() {
  module.exports = function(robot) {
    var exempt = ['ross', 'jasongriffith'];
    robot.hear(/((is|are) (seriously |literally )?(bad|terrible|awful|the worst)|sucks?).?\S*$/i, function(res) {
      if (exempt.indexOf(res.message.user.name) !== -1) {
        return;
      }
      return res.reply(':dance: much like your posting')
    });
  }
}).call(this);
