'use strict';
var util = require("node-weixin-util");
var request = require("request");


module.exports = function get(app, auth, url, params, cb) {
  auth.determine(app, function () {
    params.access_token = auth.accessToken;
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
