/*jslint node:true es6:true*/
let mongoose = require('mongoose'),
    config = require('../configurations/config.js'),
    DbConnections = {},
    dbs = ['p8security'],
    replicaSets = {
        p8security: config.mongodb.replica
    },
    options = {};
mongoose.Promise = global.Promise;

// add options for replica sets, override connection timeout to 30 seconds
dbs.forEach(function (dbName) {
    'use strict';
    options[dbName] = {
        db: {
            native_parser: true
        },
        server: {
            poolSize: process.env.POOL_SIZE || 2,
            readPreference: 'primaryPreferred',
            socketOptions: {
                keepAlive: 1,
                connectTimeoutMS: 30000,
                auto_reconnect: true
            }
        }
    };
    if (config.mongodb.replica !== '') {
        options[dbName].replSet = {
            poolSize: process.env.POOL_SIZE || 2,
            rs_name: replicaSets[dbName],
            readPreference: 'primaryPreferred',
            socketOptions: {
                keepAlive: 1,
                connectTimeoutMS: 30000,
                auto_reconnect: true
            }
        };
    }
});

function init(callback) {
    'use strict';
    let fullSet = 0,
        connectionMap = {},
        startTheServer = function (theDbName) {
            if (!connectionMap[theDbName]) {
                fullSet += 1;
                connectionMap[theDbName] = true;
                if (fullSet === dbs.length) {
                    if (callback && typeof callback === 'function') {
                        callback();
                    }
                }
            }
        };
    dbs.forEach(function (dbName) {
        if (config.mongodb[dbName] && config.mongodb[dbName].length > 0) {
            DbConnections[dbName] = mongoose.createConnection(config.mongodb[dbName], options[dbName]);
            DbConnections[dbName].on('connecting', function () {
                console.log('Connecting to: ' + dbName);
            });
            DbConnections[dbName].on('connected', function () {
                console.log(process.pid + ' >> Connected to: ' + dbName);
                startTheServer(dbName);
            });
            DbConnections[dbName].on('error', function (err) {
                console.log('Error, trying to reconnect to: ' + dbName + ' >> ' + err);
            });
            DbConnections[dbName].on('disconnected', function () {
                console.log('Disconnected connection: ' + dbName);
            });
            DbConnections[dbName].on('fullsetup', function () {
                console.log('Full replica set connected: ' + dbName);
            });
            DbConnections[dbName].on('reconnected', function () {
                console.log('Reconnected to: ' + dbName);
            });
            DbConnections[dbName].on('close', function () {
                console.log('Closed connection: ' + dbName + '...');
            });
        }
    });
}

function shutdown() {
    'use strict';
    dbs.forEach(function (dbName) {

        if (config.mongodb[dbName] && config.mongodb[dbName].length > 0) {
            try {
                DbConnections[dbName].close();
            } catch (dbEx) {
                console.log(dbEx);
            }
        }
    });
    DbConnections = {};
}

DbConnections.shutdown = shutdown;
DbConnections.init = init;

module.exports = DbConnections;