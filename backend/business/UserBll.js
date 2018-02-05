/*jslint node:true es6:true*/
let userProcessor = require('../framework/ProcessorPack.js').User,
    createUser = userProcessor.CreateUser;

module.exports = {
    CreateUser: createUser
};