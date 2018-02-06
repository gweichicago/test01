/*jslint node:true es6:true*/
let SchemaPack = require("../framework/SchemaPack.js"),
	guid = require('uuid');
function createUser(params, callback) {
    'user strict';
    console.log("createUser from processor", params);
    callback(null, params);
}


module.exports = {
    CreateUser: createUser
};