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
  remove: function(settings, app, tagId, cb) {
    send(settings, app,
      'https://api.weixin.qq.com/cgi-bin/tags/delete?', {
        tag: {
          id: tagId
        }
      },
      cb
    );
  },
  list: function(settings, app, tagId, openId, cb) {
    var next_openid = openId || '';
    send(settings, app, 
      'https://api.weixin.qq.com/cgi-bin/user/tag/get?', {
        tagid: tagId,
        next_openid: next_openid
      }, 
      cb 
    );
  },
  tagUsers: function(settings, app, tagId, OpenIdList, cb) {
    send(settings, app,
      'https://api.weixin.qq.com/cgi-bin/tags/members/batchtagging?', {
        openid_list: OpenIdList,
        tagid: tagId
      },
      cb
    );
  },
  untagUsers: function(settings, app, tagId, OpenIdList, cb) {
    send(settings, app,
      'https://api.weixin.qq.com/cgi-bin/tags/members/batchuntagging?', {
        openid_list: OpenIdList,
        tagid: tagId
      },
      cb
    );
  },
  getTagIdList: function(settings, app, openId, cb) {
    send(settings, app,
      'https://api.weixin.qq.com/cgi-bin/tags/getidlist?', {
        openid: openId
      },
      cb
    );
  },
  getBlackList: function(settings, app, openId, cb) {
    var params = {};
    if (openId) {
      params = {
        next_openid: openId
      };
    }
    get(settings, app, 'https://api.weixin.qq.com/cgi-bin/tags/members/getblacklist?', params, cb);
  },
  batchBlackList: function(settings, app, OpenIdList, cb) {
    post(settings, app, 
      'https://api.weixin.qq.com/cgi-bin/tags/members/getblacklist?', {
        openid_list: OpenIdList
      }, 
      cb
    );
  },
  batchUnblackList: function(settings, app, OpenIdList, cb) {
    post(settings, app, 
      'https://api.weixin.qq.com/cgi-bin/tags/members/batchunblacklist?', {
        openid_list: OpenIdList
      }, 
      cb
    );
  }
};
