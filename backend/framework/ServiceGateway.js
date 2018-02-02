/*jslint node:true es6:true*/
let p8Auth = require('../security/P8Auth.js');
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
        console.log(currentuser);
        res.send(currentuser);
    });
}

module.exports = {
    ProcessRequest: processRequest
};