(function() {
  module.exports = function(robot) {

    var Scoreboard = require('../lib/scoreboard.js');
    var scoreboard = new Scoreboard();
    var Auth = require('../lib/auth.js');
    var auth = new Auth();
    var Regexp = require('../lib/regexp.js');
    var reg = new Regexp(robot.name);

    var emot = function(score) {
      if (score > 50) {
        return ':aaaaa:';
      } else if (score > 25) {
        return ':aaa';
      } else if (score > 10) {
        return ':golfclap:';
      } else {
        return ':simple_smile:'
      }
    }

    robot.hear(reg.exp('\\+1 \\@?(.+)'), function(res) {
      if (res.match[1].length > 64) {
        return res.reply(':neutral_face: tl;dr, not counting')
      }
      var score = scoreboard.add(res.match[1]);
      console.log(res.message.user.name + ' upvoted ' + res.match[1]);
      if (res.match[1] === 'derp') {
        return res.reply(':blush: thanks! i have ' + score.toString() + ' points now.');
      }
      return res.reply(
        emot(score) + res.match[1] + ' now has ' + score.toString() + ' points.'
      );
    });

    robot.hear(reg.exp(robot.name + ' set (.+) (\\d+)', 'i'), function(res) {
      var score = scoreboard.set(res.match[1], res.match[2]);
      if (!auth.isAdmin(res.message.user.name)) {
        return;
      }
      console.log('you forced ' + res.match[1] + ' to ' + res.match[2]);
      return res.reply(
        emot(score) + res.match[1] + ' now has ' + score.toString() + ' points.'
      );
    });

    robot.hear(reg.exp(robot.name + ' get\\s?(.+)', 'i'), function(res) {
      var thing = res.match[1] ? res.match[1] : res.message.user.name;
      var score = scoreboard.get(thing);
      console.log(res.message.user.name + ' requested ' + thing);
      return res.reply(
        emot(score) + res.match[1] + ' now has ' + score.toString() + ' points.'
      );
    });

    robot.hear(reg.exp(robot.name + ' top', 'i'), function(res) {
        var score = scoreboard.get();
        var tuples = [];
        for (var key in score) { tuples.push([key, score[key]]); }
        tuples.sort(function(a, b) {
            a = a[1];
            b = b[1];
            return a > b ? -1 : (a < b ? 1 : 0);
        });

        var result = ':eng101: The winners are: ';
        for (var i = 0; i < tuples.length && i < 5; i++) {
            result += tuples[i][0] + ' (' + parseInt(tuples[i][1], 10) + ') ';
        }

        if (tuples.length > 5) {
           // result += 'and the loser is ' + tuples[tuples.length - 1][0] + ' (' + parseInt(tuples[tuples.length - 1][1], 10) + ') ';
        }

        console.log(res.message.user.name + ' requested top');
        return res.reply(result);
    });

  }

}).call(this);
