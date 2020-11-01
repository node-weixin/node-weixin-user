'use strict';
/* eslint camelcase: [2, {properties: "never"}] */
/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

var send = require('./send');

module.exports = {
  create: function(settings, app, name, cb) {
    send(settings, app,
      'https://api.weixin.qq.com/cgi-bin/tags/create?', {
        tag: {
          name: name
        }
      },
      cb
    );
  },
  get: function(settings, app, cb) {
    send(settings, app,
      'https://api.weixin.qq.com/cgi-bin/tags/get?',
      null,
      cb
    );
  },
  update: function(settings, app, tagId, newName, cb) {
    send(settings, app,
      'https://api.weixin.qq.com/cgi-bin/tags/update?', {
        tag: {
          id: tagId,
          name: newName
        }
      },
      cb
    );
  },
  delete: function(settings, app, tagId, cb) {
    send(settings, app,
      'https://api.weixin.qq.com/cgi-bin/tags/delete?', {
        tag: {
          id: tagId
        }
      },
      cb
    );
  },
  list: function(settings, app, tagId, openid, cb) {
    var next_openid = openid || '';
    send(settings, app, 
      'https://api.weixin.qq.com/cgi-bin/user/tag/get?', {
        tagid: tagId,
        next_openid: next_openid
      }, 
      cb 
    );
  },
  tagUsers: function(settings, app, tagId, openid_list, cb) {
    send(settings, app,
      'https://api.weixin.qq.com/cgi-bin/tags/members/batchtagging?', {
        openid_list: openid_list,
        tagid: tagId
      },
      cb
    );
  },
  untagUsers: function(settings, app, tagId, openid_list, cb) {
    send(settings, app,
      'https://api.weixin.qq.com/cgi-bin/tags/members/batchuntagging?', {
        openid_list: openid_list,
        tagid: tagId
      },
      cb
    );
  },
  getidlist: function(settings, app, openid, cb) {
    send(settings, app,
      'https://api.weixin.qq.com/cgi-bin/tags/getidlist?', {
        openid: openid
      },
      cb
    );
  },
  getblacklist: function(settings, app, openid, cb) {
    var params = {};
    if (openid) {
      params = {
        next_openid: openid
      };
    }
    get(settings, app, 'https://api.weixin.qq.com/cgi-bin/tags/members/getblacklist?', params, cb);
  },
  batchblacklist: function(settings, app, openid_list, cb) {
    post(settings, app, 
      'https://api.weixin.qq.com/cgi-bin/tags/members/getblacklist?', {
        openid_list: openid_list
      }, 
      cb
    );
  },
  batchunblacklist: function(settings, app, openid_list, cb) {
    post(settings, app, 
      'https://api.weixin.qq.com/cgi-bin/tags/members/batchunblacklist?', {
        openid_list: openid_list
      }, 
      cb
    );
  }
};
