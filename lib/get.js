'use strict';
var util = require("node-weixin-util");
var request = require("request");
var auth = require('node-weixin-auth');
var settings = require('node-weixin-settings');

var DEFAULT_TIMEOUT = 10 * 1000;

module.exports = function get(app, url, params, cb) {
  auth.determine(app, function () {
    settings.get(app.id, 'auth', function(authData) {
      params.access_token = authData.accessToken;
      url = url + util.toParam(params);
      settings.get(app.id,'request',function (requestData) {
        requestData = requestData || {};
        requestData.timeout = requestData.timeout || DEFAULT_TIMEOUT;
        request(url, requestData, function (error, response, body) {
          if (!error && response.statusCode === 200) {
            //Return false if succeeded, else true
            cb(false, JSON.parse(body));
          } else if (error) {
            cb(true, {message: String(error)});
          } else {
            cb(true, {message: body});
          }
        });
      });
    });

  });
};
