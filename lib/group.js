'use strict';
var send = require('./send');

module.exports = {
  create: function (app, auth, name, cb) {
    send(app, auth,
      'https://api.weixin.qq.com/cgi-bin/groups/create?',
      {
        group: {
          name: name
        }
      },
      cb
    );
  },
  get: function (app, auth, cb) {
    send(app, auth,
      'https://api.weixin.qq.com/cgi-bin/groups/get?',
      null,
      cb
    );
  },
  in: function (app, auth, openid, cb) {
    send(app, auth,
      'https://api.weixin.qq.com/cgi-bin/groups/getid?',
      {
        openid: openid
      },
      cb
    );
  },
  update: function (app, auth, groupId, newName, cb) {
    send(app, auth,
      'https://api.weixin.qq.com/cgi-bin/groups/update?',
      {
        group: {
          id: groupId,
          name: newName
        }
      },
      cb
    );
  },
  move: function (app, auth, groupId, openId, cb) {
    send(app, auth,
      'https://api.weixin.qq.com/cgi-bin/groups/members/update?',
      {
        openid: openId,
        to_groupid: groupId
      },
      cb
    );
  },
  remove: function (app, auth, groupId, cb) {
    send(app, auth,
      'https://api.weixin.qq.com/cgi-bin/groups/delete?',
      {
        group: {
          id: groupId
        }
      },
      cb
    );
  },
};
