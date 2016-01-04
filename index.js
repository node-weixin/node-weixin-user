'use strict';
var send = require("./lib/send");
var get = require('./lib/get');

module.exports = {
  group: require('./lib/group'),
  remark: function(app, openId, remark, cb) {
    send(app,
      'https://api.weixin.qq.com/cgi-bin/user/info/updateremark?',
      {
        openid: openId,
        remark: remark
      },
      cb
    );
  },
  profile: function(app, openId, cb) {
    get(app, 'https://api.weixin.qq.com/cgi-bin/user/info?', {
      openid: openId,
      lang: 'zh_CN'
    }, cb);
  },
  batchProfiles: function(app, opendIds, cb) {
    var user_list = [];
	for (var i = 0; i < openIds.length; i++) {
	  var user = {openid: openIds[i], lang: "zh-CN"};
	  user_list.push(user);
	}
    send(app, 'https://api.weixin.qq.com/cgi-bin/user/info/batchget?', {
      user_list: user_list
	}, cb);
  },
  list: function(app, openid, cb) {
    var params = {};
    if (openid) {
      params = {
        next_openid: openid
      };
    }
    get(app, 'https://api.weixin.qq.com/cgi-bin/user/get?', params, cb);
  }
};
