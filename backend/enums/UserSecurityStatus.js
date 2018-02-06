/*jslint node:true es6:true*/
var Enums = {
    Active: 0,
    InActive: 0,
    PasswordChangeRequired: 0,
    Suspended: 0,
    LockedOut: 0
};
require('./EnumsBase.js').SetNames(Enums);

module.exports = Enums;