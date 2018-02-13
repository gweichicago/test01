/*jslint node:true es6:true*/
let SchemaPack = require("../framework/SchemaPack.js"),
    guid = require('uuid');
async function createUser(params) {
    'user strict';
    try {
	    let userSecurity = new SchemaPack.UserSecurity({
	        p8Id: guid.v1(),
	        UserName: params.UserName,
	        Password: params.Password
	    }),
	    result = await userSecurity.save();
	    return result;
    }
    catch (error) {
    	throw error;
    }
}


module.exports = {
    CreateUser: createUser
};