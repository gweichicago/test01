/*jslint node:true es6:true*/
module.exports = function () {
    'use strict';
    return {
        deploy: {
            useNodeEnv: false
        },
        mongodb: {
            p8security: process.env.MONGO_P8SECURITY || 'mongodb://localhost:27017/p8security',
            winstonlog: {
                host: process.env.MONGO_P8LOG || 'localhost',
                port: process.env.MONGO_P8LOG_PORT || 27017,
                db: 'hglog',
                collection: 'log'
            },
            replica: process.env.MONGO_REPLICA || '',
            replicaLR: process.env.MONGO_REPLICA_LR || process.env.MONGO_REPLICA || ''
        },
        baseUrl: '//localhost:3000/',
        protocol: 'http:'
    };
};
