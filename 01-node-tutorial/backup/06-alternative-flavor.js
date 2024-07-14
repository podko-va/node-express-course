const { secondname } = require("./04-names");

module.exports.firstname = 'Kate';
module.exports.surname = 'Po';
module.exports.fullname = function(){
    return `${this.firstname} ${secondname}`
};