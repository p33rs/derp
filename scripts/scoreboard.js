(function() {
  module.exports = function(robot) {
    var jsonfile = require('jsonfile');
    var scoreboard = {
        file: '/home/ubuntu/scores.json',
        add: function(name) {
            var current = this.get();
console.log(current);
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
            var current = jsonfile.readFileSync(this.file);
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
            jsonfile.writeFile(this.file, data);
        }
    };

    robot.hear(/\+1 \@?([\w\d]+)/i, function(res) {
        var score = scoreboard.add(res.match[1]);
        console.log(res.message.user.name + ' upvoted ' + res.match[1]);
        return res.reply(res.match[1] + ' now has ' + score.toString() + ' points.');
    });

    robot.hear(new RegExp(robot.name + ' set ([\\w\\d\\.]+) (\\d+)', 'i'), function(res) {
        var score = scoreboard.set(res.match[1], res.match[2]);
        if (res.message.user.name !== 'jon') return;
        console.log('you forced ' + res.match[1] + ' to ' + res.match[2]);
        return res.reply(res.match[1] + ' now has ' + score.toString() + ' points.');
    });

    robot.hear(new RegExp(robot.name + ' get\\s?([\\w\\d\\.]*)', 'i'), function(res) {
        var thing = res.match[1] ? res.match[1] : res.message.user.name; 
        var score = scoreboard.get(thing);
        console.log(res.message.user.name + ' requested ' + thing);
        return res.reply(thing + ' now has ' + score.toString() + ' points.');
    });
 
    robot.hear(new RegExp(robot.name + ' top', 'i'), function(res) {
        var score = scoreboard.get();
        var tuples = [];
        for (var key in score) { tuples.push([key, score[key]]); }
        tuples.sort(function(a, b) {
            a = a[1];
            b = b[1];
            return a > b ? -1 : (a < b ? 1 : 0);
        });

        var result = 'The winners are: ';
        for (var i = 0; i < tuples.length && i < 5; i++) {
            result += tuples[i][0] + ' (' + parseInt(tuples[i][1], 10) + ') ';
        }

        if (tuples.length > 5) {
            result += 'and the loser is ' + tuples[tuples.length - 1][0] + ' (' + parseInt(tuples[tuples.length - 1][1], 10) + ') ';
        }

        console.log(res.message.user.name + ' requested top');
        return res.reply(result);
    });

  }

}).call(this);
