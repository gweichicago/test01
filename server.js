/*jslint node:true es6:true*/
let express = require('express'),
    app = express(),
    serviceGateway = require('./backend/framework/ServiceGateway.js');



app.get('/svc/:ServiceName/:MethodName', serviceGateway.ProcessRequest);
app.post('/svc/:ServiceName/:MethodName', serviceGateway.ProcessRequest);

app.get('/', function (req, res) {
    'use strict';
    console.log(req.params);
    res.send('Hello world');
});
app.listen(3000);