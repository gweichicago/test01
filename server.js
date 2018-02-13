/*jslint node:true es6:true*/
let express = require('express'),
    app = express(),
    cookieParser = require('cookie-parser'),
    DbConnections = require('./backend/framework/DbConnections.js'),
    async = require('async'),
    port = process.env.PORT || 8888,
    bodyParser = require('body-parser'),
    maxConnections = 100000,
    bodyParserUrl = bodyParser.urlencoded({
        extended: true,
        keepExtensions: true,
        limit: '5mb'
    }),
    middleWares = [
        cookieParser(),
        bodyParser.json({
            limit: '5mb'
        }),
        bodyParserUrl
    ],
    serviceGateway;

function parallel(middlewares) {
    'use strict';
    return function (req, res, next) {
        async.each(middlewares, (mw, cb) => {
            mw(req, res, cb);
        }, next);
    };
}

app.get('/', function (req, res) {
    'use strict';
    console.log(req.params);
    res.send('Hello world');
});
DbConnections.init(function () {
    'use strict';
    serviceGateway = require('./backend/framework/ServiceGateway.js');
    app.use(parallel(middleWares));
    app.get('/svc/:ServiceName/:MethodName', serviceGateway.ProcessRequest);
    app.post('/svc/:ServiceName/:MethodName', serviceGateway.ProcessRequest);
    app.listen(port, maxConnections, function () {
        console.log(process.pid);
    });
});
