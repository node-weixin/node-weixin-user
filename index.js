'use strict';
var send = require("./lib/send");
var get = require('./lib/get');

module.exports = {
  group: require('./lib/group'),
  remark: function(app, auth, openId, remark, cb) {
    send(app, auth,
      'https://api.weixin.qq.com/cgi-bin/user/info/updateremark?',
      {
        openid: openId,
        remark: remark
      },
      cb
    );
  },
  profile: function(app, auth, openId, cb) {
    get(app, auth, 'https://api.weixin.qq.com/cgi-bin/user/info?', {
      openid: openId,
      lang: 'zh_CN'
    }, cb);
  },
  list: function(app, auth, openid, cb) {
    var params = {};
    if (openid) {
      params = {
        next_openid: openid
      };
    }
    get(app, auth, 'https://api.weixin.qq.com/cgi-bin/user/get?', params, cb);
  }
};
