'use strict';
var util = require("node-weixin-util");
var request = require("node-weixin-request");
var auth = require('node-weixin-auth');
var settings = require('node-weixin-settings');

module.exports = function send(app, url, data, cb) {
  auth.determine(app, function () {
    var authData = settings.get(app.id, 'auth');
    url = url + util.toParam({
        access_token: authData.accessToken
      });
    request.json(url, data, cb);
  });
};
