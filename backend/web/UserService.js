/*jslint node:true es6:true*/
let userBll = require('../framework/BllPack.js').User,
    responseHelper = require('../framework/ResponseHelper');
function login(params) {
    'user strict';
    if (params.req.body.UserName === "gwei@pier88health.com" && params.req.body.Password === "RightPassword") {
        return params.res.send("You login correctly");
    }
    params.res.send("Wrong username or password");
}

function createUser(params) {//before going live, this will require a token to prove the user isn't a robot
    'user strict';
    userBll.CreateUser({
        UserName: params.req.body.UserName,
        Password: params.req.body.Password
    }, function (error, data) {
        if (error) {
            return responseHelper.SendError(params.res, error);
        }
        responseHelper.SendData(params.res, data);
    });
}
module.exports = {
    Login: login,
    CreateUser: createUser
};