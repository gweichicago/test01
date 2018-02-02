/*jslint node:true es6:true*/
let services = require('./Services.js'),
    AuthorizationLevel = require('../enums/AuthorizationLevel.js');

function authUserRequest(params, callback) {
    'user strict';
    console.log('authUserRequest:', params);
    callback(null, "User leve auth, place holder");
}
function authRequest(params, callback) {
    'user strict';
    let service = services[params.ServiceName];
    if (!service || !service.AuthorizeLevel) {
        return callback("Invalid service name or missing security setting");
    }
    if (service.AuthorizeLevel === AuthorizationLevel.Anonymous) {
        return callback(null, "No auth needed.");
    }
    if (service.AuthorizeLevel === AuthorizationLevel.Client) {
        return callback("Not supported right now, use client key for API call");
    }
    if (service.AuthorizeLevel === AuthorizationLevel.ClientIP) {
        return callback("Not supported right now, use certain IP address to auth");
    }
    if (service.AuthorizeLevel === AuthorizationLevel.User) {
        return authUserRequest(params, callback);
    }
    callback("Unsupported auth type!");
}


module.exports = {
    AuthRequest: authRequest
};