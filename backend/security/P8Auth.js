/*jslint node:true es6:true*/
let services = require('./Services.js'),
    AuthorizationLevel = require('../enums/AuthorizationLevel.js');

function authUserRequest(params) {
    'user strict';
    console.log('authUserRequest:', params);
    return "User leve auth, place holder";
}
function authRequest(params) {
    'user strict';
    let service = services[params.ServiceName];
    if (!service || !service.AuthorizeLevel) {
        throw "Invalid service name or missing security setting";
    }
    if (service.AuthorizeLevel === AuthorizationLevel.Anonymous) {
        return "No auth needed.";
    }
    if (service.AuthorizeLevel === AuthorizationLevel.Client) {
        return "Not supported right now, use client key for API call";
    }
    if (service.AuthorizeLevel === AuthorizationLevel.ClientIP) {
        return "Not supported right now, use certain IP address to auth";
    }
    if (service.AuthorizeLevel === AuthorizationLevel.User) {
        return authUserRequest(params);
    }
    throw "Unsupported auth type!";
}


module.exports = {
    AuthRequest: authRequest
};