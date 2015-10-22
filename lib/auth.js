module.exports = function() {
    var fs = require('fs');
    var jsonfile = require('jsonfile');
    var filename = '/home/jon/hubot/storage/auth.json';
    var readFile = function() {
        if (!fs.existsSync(filename)) {
            return [];
        }
        var result = jsonfile.readFileSync(filename, {throws: false});
        return result ? result : [];
    }
    var saveFile = function(data) {
        jsonfile.writeFileSync(filename, data);
        return this;
    }
    return {
        isAdmin: function(name) {
            var list = this.listAdmins();
            return this.listAdmins().indexOf(name) !== -1;
        },
        addAdmin: function(name) {
            if (this.isAdmin(name)) {
                return this;
            }
            if (typeof name !== 'string') {
                throw new Error('invalid admin added');
            }
            var list = this.listAdmins();
            list.push(name);
            saveFile(list);
            return this;
        },
        removeAdmin: function(name) {
            var list = this.listAdmins();
            var index = list.indexOf(name);
            if (index !== -1) {
                saveFile(list.splice(i, 1))
            }
            return this;
        },
        listAdmins: function(name) {
            return readFile();
        }
    };
};
