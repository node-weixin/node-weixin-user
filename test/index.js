'use strict';

/* eslint camelcase: [2, {properties: "never"}] */
/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

var assert = require('assert');
var nodeWeixinUser = require('../');
var validator = require('validator');

var app = {
  id: process.env.APP_ID,
  secret: process.env.APP_SECRET,
  token: process.env.APP_TOKEN
};

var config = require('node-weixin-config');
config.app.init(app);

describe('node-weixin-user node module', function() {
  var gGroup;
  it('should be able to create group', function(done) {
    nodeWeixinUser.group.create(app, 'hello', function(error, data) {
      assert.equal(true, !error);
      gGroup = data.group;
      assert.equal(true, typeof data.group.id === 'number');
      assert.equal(true, typeof data.group.name === 'string');
      done();
    });
  });
  it('should be able to get group', function(done) {
    nodeWeixinUser.group.get(app, function(error, data) {
      assert.equal(true, !error);
      assert.equal(true, data.groups.length > 0);
      for (var i = 0; i < data.groups.length; i++) {
        var group = data.groups[i];
        assert.equal(true, group.id >= 0);
        assert.equal(true, group.count >= 0);
        assert.equal(true, group.name.length >= 1);
        assert.equal(true, typeof group.name === 'string');
      }
      done();
    });
  });
  it('should be able to get group of user', function(done) {
    nodeWeixinUser.group.in(app, process.env.APP_OPENID, function(error, data) {
      assert.equal(true, !error);
      assert.equal(true, typeof data.groupid === 'number');
      done();
    });
  });

  it('should be able to update a group', function(done) {
    nodeWeixinUser.group.update(app, gGroup.id, 'new name', function(error, data) {
      assert.equal(true, !error);
      assert.equal(true, data.errcode === 0);
      assert.equal(true, data.errmsg === 'ok');
      done();
    });
  });

  it('should be able to update remark', function(done) {
    nodeWeixinUser.remark(app, process.env.APP_OPENID, '新备注', function(error, data) {
      assert.equal(true, !error);
      assert.equal(true, data.errcode === 0);
      assert.equal(true, data.errmsg === 'ok');
      done();
    });
  });

  it('should be able to get profile', function(done) {
    nodeWeixinUser.profile(app, process.env.APP_OPENID, function(error, data) {
      assert.equal(true, !error);
      assert.equal(true, typeof data.subscribe === 'number');
      assert.equal(true, validator.isInt(String(data.subscribe)));
      assert.equal(true, data.openid === process.env.APP_OPENID);
      assert.equal(true, typeof data.nickname === 'string');
      assert.equal(true, typeof data.sex === 'number');
      assert.equal(true, validator.isInt(String(data.sex)));
      assert.equal(true, typeof data.language === 'string');
      assert.equal(true, typeof data.city === 'string');
      assert.equal(true, typeof data.country === 'string');
      if (data.headimgurl) {
        assert.equal(true, validator.isURL(data.headimgurl));
      }
      done();
    });
  });

  it('should be able to list users without openid', function(done) {
    nodeWeixinUser.list(app, null, function(error, data) {
      assert.equal(true, !error);
      assert.equal(true, data.total >= 1);
      assert.equal(true, data.count >= 1);
      if (data.data && data.data.openid) {
        assert.equal(true, data.data.openid.length >= 0);
      }
      done();
    });
  });

  it('should be able to list users', function(done) {
    nodeWeixinUser.list(app, process.env.APP_OPENID, function(error, data) {
      assert.equal(true, !error);
      assert.equal(true, data.total >= 0);
      assert.equal(true, data.count >= 0);
      if (data.data && data.data.openid) {
        assert.equal(true, data.data.openid.length >= 0);
      }
      done();
    });
  });

  it('should be able to move to a new group', function(done) {
    nodeWeixinUser.group.move(app, gGroup.id, process.env.APP_OPENID, function(error, data) {
      assert.equal(true, !error);
      if (data.errcode !== 40050) {
        assert.equal(true, data.errcode === 0);
        assert.equal(true, data.errmsg === 'ok');
      }
      done();
    });
  });

  it('should be able to remove a group', function(done) {
    nodeWeixinUser.group.remove(app, gGroup.id, function(error) {
      assert.equal(true, !error);
      done();
    });
  });

  it('should be failed to get', function(done) {
    var get = require('../lib/get');
    get(app, 'https://you.abc.cc.com/', {}, function(error) {
      assert.equal(true, error);
      done();
    });
  });
});
