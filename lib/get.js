'use strict';
/* eslint camelcase: [2, {properties: "never"}] */
/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

var util = require('node-weixin-util');
var request = require('request');
var auth = require('node-weixin-auth');

module.exports = function get(settings, app, url, params, cb) {
  auth.determine(settings, app, function() {
    settings.get(app.id, 'auth', function(authData) {
      params.access_token = authData.accessToken;
      url += util.toParam(params);
      request(url, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          // Return false if succeeded, else true
          cb(false, JSON.parse(body));
        } else {
          cb(true, {
            message: body
          });
        }
      });
    });
  });
};
