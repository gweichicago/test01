/*jslint node:true es6:true*/
let SchemaPack = require("../framework/SchemaPack.js"),
    guid = require('uuid');
function createUser(params, callback) {
    'user strict';
    let userSecurity = new SchemaPack.UserSecurity({
        p8Id: guid.v1(),
        UserName: params.UserName,
        Password: params.Password
    });
    userSecurity.save(callback);
}


module.exports = {
    CreateUser: createUser
};