/*jslint node:true es6:true*/

function authRequest(params, callback) {
    'user strict';
    console.log(params);
    callback(null, "this is authenticated and authorized");

}


module.exports = {
    AuthRequest: authRequest
};