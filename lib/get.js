'use strict';
var util = require("node-weixin-util");
var request = require("request");
var auth = require('node-weixin-auth');
var settings = require('node-weixin-settings');


module.exports = function get(app, url, params, cb) {
  auth.determine(app, function () {
    settings.get(app.id, 'auth', function(authData) {
      params.access_token = authData.accessToken;
      url = url + util.toParam(params);
      settings.get(app.id,'timeout',function (timeout) {
        //默认10秒超时
        timeout = timeout || 10 * 1000;
        request(url, {timeout: timeout}, function (error, response, body) {
          if (!error && response.statusCode === 200) {
            //Return false if succeeded, else true
            cb(false, JSON.parse(body));
          } else {
            cb(true, {message: body});
          }
        });
      });
    });

  });
};
