/*jslint node:true es6:true*/
function createUser(params, callback) {
    'user strict';
    console.log("createUser", params);
    callback(null, params);
}


module.exports = {
    CreateUser: createUser
};