/*jslint node:true es6:true*/
// send in a params object to support future configs
let environment = process.env.BUILD_ENV || 'local',
    Config = require('../configurations/cf/' + environment + '-config.js')({
        path: __dirname.replace('/backend/configurations', '')
    }),
    databases = ['p8security'],
    primary = process.env.REPLICA_PRIMARY || 'a0',
    secondary = process.env.REPLICA_SECONDARY || 'a1',
    primaryB = process.env.REPLICA_PRIMARY_B || 'a0',
    secondaryB = process.env.REPLICA_SECONDARY_B || 'a1',
    envInvariants = {
        P8GlobalUserId: '5e42c56e-5b17-4070-817f-d924a5cd7462',
        PublicGroupId: 'db742790-41ca-11e5-b754-c9dc5f0e768c'
    };


Object.keys(envInvariants).forEach(function (prop) {
    'use strict';
    Config[prop] = Config[prop] || envInvariants[prop];
});

// set primary and secondary
databases.forEach(function (db) {
    'use strict';
    if (Config.mongodb[db]) {
        Config.mongodb[db] = Config.mongodb[db].replace(/__primary__/g, primary).replace(/__secondary__/g, secondary);
        Config.mongodb[db] = Config.mongodb[db].replace(/__primaryB__/g, primaryB).replace(/__secondaryB__/g, secondaryB);
    }
});
if (Config.mongodb.winstonlog && Config.mongodb.winstonlog.host) {
    Config.mongodb.winstonlog.host = Config.mongodb.winstonlog.host.replace(/__primary__/g, primary).replace(/__secondary__/g, secondary);
    Config.mongodb.winstonlog.host = Config.mongodb.winstonlog.host.replace(/__primaryB__/g, primaryB).replace(/__secondaryB__/g, secondaryB);
}

module.exports = Config;
