/*jslint node:true es6:true*/
let AuthorizationLevel = require('../enums/AuthorizationLevel.js'),
    Services = {
        Feed: {
            Description: 'Feed service, get personalized newsfeed',
            AuthorizeLevel: AuthorizationLevel.User
        },
        User: {
            Description: 'For users who currently not logged in, e.g., login, create new user. ',
            AuthorizeLevel: AuthorizationLevel.Anonymous
        }
    };
module.exports = Services;
