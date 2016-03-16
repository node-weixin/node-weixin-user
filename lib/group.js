'use strict';
/* eslint camelcase: [2, {properties: "never"}] */
/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

var send = require('./send');

module.exports = {
  create: function(app, name, cb) {
    send(app,
      'https://api.weixin.qq.com/cgi-bin/groups/create?', {
        group: {
          name: name
        }
      },
      cb
    );
  },
  get: function(app, cb) {
    send(app,
      'https://api.weixin.qq.com/cgi-bin/groups/get?',
      null,
      cb
    );
  },
  in: function(app, openid, cb) {
    send(app,
      'https://api.weixin.qq.com/cgi-bin/groups/getid?', {
        openid: openid
      },
      cb
    );
  },
  update: function(app, groupId, newName, cb) {
    send(app,
      'https://api.weixin.qq.com/cgi-bin/groups/update?', {
        group: {
          id: groupId,
          name: newName
        }
      },
      cb
    );
  },
  move: function(app, groupId, openId, cb) {
    send(app,
      'https://api.weixin.qq.com/cgi-bin/groups/members/update?', {
        openid: openId,
        to_groupid: groupId
      },
      cb
    );
  },
  remove: function(app, groupId, cb) {
    send(app,
      'https://api.weixin.qq.com/cgi-bin/groups/delete?', {
        group: {
          id: groupId
        }
      },
      cb
    );
  }
};
