/*jslint node:true es6:true*/
const Enums = {
    Anonymous: 0,
    Client: 0,
    ClientIP: 0,
    User: 0
};
require('./EnumsBase.js').SetNames(Enums);

module.exports = Enums;