/*jslint node:true es6:true*/
let services = require('./Services.js'),
    AuthorizationLevel = require('../enums/AuthorizationLevel.js');
function authRequest(params, callback) {
    'user strict';
    let service = services[params.ServiceName];
    if (!service || !service.AuthorizeLevel) {
        return callback("Invalid service name or missing security setting");
    }
    if (service.AuthorizeLevel === AuthorizationLevel.Anonymous) {
        return callback(null, "No auth needed.");
    }
    console.log(params);
    callback(null, "this is authenticated and authorized");
}


module.exports = {
    AuthRequest: authRequest
};