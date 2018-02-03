/*jslint node:true es6:true*/
let p8Auth = require('../security/P8Auth.js'),
    services = require('./WebServices.js');
function processRequest(req, res) {
    'user strict';
    p8Auth.AuthRequest({
        ServiceName: req.params.ServiceName,
        MethodName: req.params.MethodName
    }, function (error, currentuser) {
        if (error) {
            console.log(error);
            return res.send(error);
        }
        if (services[req.params.ServiceName] && services[req.params.ServiceName][req.params.MethodName]) {
            return services[req.params.ServiceName][req.params.MethodName]({
                currentuser: currentuser,
                req: req,
                res: res
            });
        }
        res.send("Invalid ServiceName or MethodName");
    });
}

module.exports = {
    ProcessRequest: processRequest
};