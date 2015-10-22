var Auth = require('../lib/auth.js');
var auth = new Auth();
var EventEmitter = require('events');
module.exports = function(question, choices, duration, creator) {
    var responses = {};
    var events = new EventEmitter();
    var timeout = setTimeout(function() {
        events.emit('complete');
    }, delay);
    return {
        subscribe: function(callback) {
            events.on('complete', callback);
        },
        responses: function() {
            return responses;
        },
        choices: function() {
            return choices;
        },
        timeleft: function() {
        },
        extend: function() {
        },
        abort: function() {
            clearTimeout(timeout);
        },
        complete: function() {
            clearTimeout(timeout);
            events.emit('complete');
        },
        getOption: function() {

        },
        addVote: function() {

        }
    };
};
