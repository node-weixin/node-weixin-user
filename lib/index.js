'use strict';

/* eslint camelcase: [2, {properties: "never"}] */
/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

var send = require('./send');
var get = require('./get');

module.exports = {
  group: require('./group'),
  remark: function(settings, app, openId, remark, cb) {
    send(settings, app,
      'https://api.weixin.qq.com/cgi-bin/user/info/updateremark?', {
        openid: openId,
        remark: remark
      },
      cb
    );
  },
  profile: function(settings, app, openId, cb) {
    get(settings, app, 'https://api.weixin.qq.com/cgi-bin/user/info?', {
      openid: openId,
      lang: 'zh_CN'
    }, cb);
  },
  list: function(settings, app, openid, cb) {
    var params = {};
    if (openid) {
      params = {
        next_openid: openid
      };
    }
    get(settings, app, 'https://api.weixin.qq.com/cgi-bin/user/get?', params, cb);
  }
};
