module.exports = function(prefix) {
    return {
        exp: function(expr, options) {
            if (!options) {
                options = '';
            }
            return new RegExp('^(' + prefix + ')?\\s*' + expr, options);
        }
    };
};
