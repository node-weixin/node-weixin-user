'use strict';
var util = require("node-weixin-util");
var request = require("request");
var auth = require('node-weixin-auth');
var settings = require('node-weixin-settings');


module.exports = function get(app, url, params, cb) {
  auth.determine(app, function () {
    var authData = settings.get(app.id, 'auth');
    params.access_token = authData.accessToken;
    url = url + util.toParam(params);
    request(url, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        //Return false if succeeded, else true
        cb(false, JSON.parse(body));
      } else {
        cb(true, {message: body});
      }
    });
  });
};
