'use strict';
var util = require("node-weixin-util");
var request = require("node-weixin-request");


module.exports = function send(app, auth, url, data, cb) {
  auth.determine(app, function () {
    url = url + util.toParam({
        access_token: auth.accessToken
      });
    request.json(url, data, cb);
  });
};
