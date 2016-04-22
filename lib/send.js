'use strict';

/* eslint camelcase: [2, {properties: "never"}] */
/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

var util = require('node-weixin-util');
var request = require('node-weixin-request');
var auth = require('node-weixin-auth');

module.exports = function send(settings, app, url, data, cb) {
  auth.determine(settings, app, function() {
    settings.get(app.id, 'auth', function(authData) {
      url += util.toParam({
        access_token: authData.accessToken
      });
      request.json(url, data, cb);
    });
  });
};
