/*jslint node:true es6:true*/
var keystore = require('../configurations/ks/' + (process.env.BUILD_ENV || 'local') + '-keystore.js'),
    envInvariants = {
        loggly: {
            token: process.env.LOGGLY_TOKEN
        }
    };
Object.keys(envInvariants).forEach(function (prop) {
    'use strict';
    keystore[prop] = keystore[prop] || envInvariants[prop];
});

module.exports = keystore;
