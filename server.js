/*jslint node:true es6:true*/
let express = require('express'),
    app = express(),
    cookieParser = require('cookie-parser'),
    DbConnections = require('./backend/framework/DbConnections.js'),
    async = require('async'),
    bodyParser = require('body-parser'),
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
    serviceGateway = require('./backend/framework/ServiceGateway.js');

function parallel(middlewares) {
    'use strict';
    return function (req, res, next) {
        async.each(middlewares, function (mw, cb) {
            mw(req, res, cb);
        }, next);
    };
}

app.use(parallel(middleWares));
app.get('/svc/:ServiceName/:MethodName', serviceGateway.ProcessRequest);
app.post('/svc/:ServiceName/:MethodName', serviceGateway.ProcessRequest);

app.get('/', function (req, res) {
    'use strict';
    console.log(req.params);
    res.send('Hello world');
});
DbConnections.init(function () {
    'use strict';
    app.listen(3000);
});
