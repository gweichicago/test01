/*jslint node:true es6:true*/

function contentTypeData(res, contentTypeHeader, contentTypeValue) {
    'user strict';
    res.set(contentTypeHeader, contentTypeValue);
}

function sendData(res, data) {
    'user strict';
    contentTypeData(res, 'Cache-Control', 'no-cache, must-revalidate');
    res.send(data);
}


module.exports = {
    SendData: sendData
};