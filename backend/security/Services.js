/*jslint node:true es6:true*/
let AuthorizationLevel = require('../enums/AuthorizationLevel.js'),
    Services = {
        User: {
            Description: 'For users who currently not logged in, e.g., login, create new user. ',
            AuthorizeLevel: AuthorizationLevel.Anonymous
        }
    };
module.exports = Services;
