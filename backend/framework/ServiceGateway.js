/*jslint node:true es6:true*/


function processRequest(req, res) {
    'user strict';
    console.log(req.query);
    console.log(req.params.ServiceName);
    console.log(req.params.MethodName);
    res.send(req.query);
}

module.exports = {
    ProcessRequest: processRequest
};