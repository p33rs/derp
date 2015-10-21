(function() 
  module.exports = function(robot) {
    var timestamp = new Date();
    robot.leave(function(res) {
        var now = new Date();
        if (now.getTime() - timestamp.getTime() < 10000) {
            return;
        }
        timestamp = now;
        return res.send(':confuoot: hey, who was that, anyway?');
    });
  }
}).call(this);
