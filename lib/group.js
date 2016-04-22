'use strict';
/* eslint camelcase: [2, {properties: "never"}] */
/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

var send = require('./send');

module.exports = {
  create: function(settings, app, name, cb) {
    send(settings, app,
      'https://api.weixin.qq.com/cgi-bin/groups/create?', {
        group: {
          name: name
        }
      },
      cb
    );
  },
  get: function(settings, app, cb) {
    send(settings, app,
      'https://api.weixin.qq.com/cgi-bin/groups/get?',
      null,
      cb
    );
  },
  in: function(settings, app, openid, cb) {
    send(settings, app,
      'https://api.weixin.qq.com/cgi-bin/groups/getid?', {
        openid: openid
      },
      cb
    );
  },
  update: function(settings, app, groupId, newName, cb) {
    send(settings, app,
      'https://api.weixin.qq.com/cgi-bin/groups/update?', {
        group: {
          id: groupId,
          name: newName
        }
      },
      cb
    );
  },
  move: function(settings, app, groupId, openId, cb) {
    send(settings, app,
      'https://api.weixin.qq.com/cgi-bin/groups/members/update?', {
        openid: openId,
        to_groupid: groupId
      },
      cb
    );
  },
  remove: function(settings, app, groupId, cb) {
    send(settings, app,
      'https://api.weixin.qq.com/cgi-bin/groups/delete?', {
        group: {
          id: groupId
        }
      },
      cb
    );
  }
};
