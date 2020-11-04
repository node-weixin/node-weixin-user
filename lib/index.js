'use strict';

/* eslint camelcase: [2, {properties: "never"}] */
/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

var send = require('./send');
var get = require('./get');

module.exports = {
  group: require('./group'),
  tags: require('./tags'),
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
  batchget: function(settings, app, openIdList, cb) {
    var userList = [];
    for(var i = 0; i < openIdList.length; i++){
      userList.push({
        openid: openId,
        lang: 'zh_CN'
      });
    }
    get(settings, app, 'https://api.weixin.qq.com/cgi-bin/user/info?', {
      user_list: userList
    }, cb);
  },
  list: function(settings, app, openId, cb) {
    var params = {};
    if (openId) {
      params = {
        next_openid: openId
      };
    }
    get(settings, app, 'https://api.weixin.qq.com/cgi-bin/user/get?', params, cb);
  }
};
