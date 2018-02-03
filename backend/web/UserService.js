/*jslint node:true es6:true*/
function login(params) {
    'user strict';
    console.log("User.Login", params.req.body);
    if (params.req.body.UserName === "gwei@pier88health.com" && params.req.body.Password === "RightPassword") {
        return params.res.send("You login correctly");
    }
    params.res.send("Wrong username or password");
}


module.exports = {
    Login: login
};