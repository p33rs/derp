(function() {
    module.exports = function(robot) {
        var c = require('cli-color');
        return robot.receiveMiddleware(function(context, next, done) {
            console.log(
                c.xterm(38)(context.response.message.user.name) + ' ' + context.response.message.text
            );
            next();
        });
    }

}).call(this);
