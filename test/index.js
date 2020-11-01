'use strict';

/* eslint camelcase: [2, {properties: "never"}] */
/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

var assert = require('assert');
var nodeWeixinUser = require('../');
var validator = require('validator');
var settings = require('node-weixin-settings');
var async = require('async');

var app = {
  id: process.env.APP_ID,
  secret: process.env.APP_SECRET,
  token: process.env.APP_TOKEN
};

var config = require('node-weixin-config');
config.app.init(app);

describe('node-weixin-user node module', function() {
  var gGroup;
  it('should clear all groups', function(done) {
    nodeWeixinUser.group.get(settings, app, function(error, data) {
      assert.strictEqual(true, !error);
      assert.strictEqual(true, data.groups.length > 0);
      for (var i = 0; i < data.groups.length; i++) {
        var group = data.groups[i];
        assert.strictEqual(true, group.id >= 0);
        assert.strictEqual(true, group.count >= 0);
        assert.strictEqual(true, group.name.length >= 1);
        assert.strictEqual(true, typeof group.name === 'string');
      }
      async.eachSeries(data.groups, function eachGroup(item, cb) {
        if (item.id < 100) {
          return cb();
        }
        nodeWeixinUser.group.remove(settings, app, item.id, function(error) {
          assert.strictEqual(true, !error);
          cb();
        });
      }, function finalGroup() {
        done();
      });
    });
  });

  it('should be able to create group', function(done) {
    nodeWeixinUser.group.create(settings, app, 'hello', function(error, data) {
      assert.strictEqual(true, !error);
      gGroup = data.group;
      assert.strictEqual(true, typeof data.group === 'object');
      assert.strictEqual(true, typeof data.group.id === 'number');
      assert.strictEqual(true, typeof data.group.name === 'string');
      done();
    });
  });
  it('should be able to get group', function(done) {
    nodeWeixinUser.group.get(settings, app, function(error, data) {
      assert.strictEqual(true, !error);
      assert.strictEqual(true, data.groups.length > 0);
      for (var i = 0; i < data.groups.length; i++) {
        var group = data.groups[i];
        assert.strictEqual(true, group.id >= 0);
        assert.strictEqual(true, group.count >= 0);
        assert.strictEqual(true, group.name.length >= 1);
        assert.strictEqual(true, typeof group.name === 'string');
      }
      done();
    });
  });
  it('should be able to get group of user', function(done) {
    nodeWeixinUser.group.in(settings, app, process.env.APP_OPENID, function(error, data) {
      assert.strictEqual(true, !error);
      assert.strictEqual(true, typeof data.groupid === 'number');
      done();
    });
  });

  it('should be able to update a group', function(done) {
    nodeWeixinUser.group.update(settings, app, gGroup.id, 'new name', function(error, data) {
      assert.strictEqual(true, !error);
      assert.strictEqual(true, data.errcode === 0);
      assert.strictEqual(true, data.errmsg === 'ok');
      done();
    });
  });

  it('should be able to update remark', function(done) {
    nodeWeixinUser.remark(settings, app, process.env.APP_OPENID, '新备注', function(error, data) {
      assert.strictEqual(true, !error);
      assert.strictEqual(true, data.errcode === 0);
      assert.strictEqual(true, data.errmsg === 'ok');
      done();
    });
  });

  it('should be able to get profile', function(done) {
    nodeWeixinUser.profile(settings, app, process.env.APP_OPENID, function(error, data) {
      assert.strictEqual(true, !error);
      assert.strictEqual(true, typeof data.subscribe === 'number');
      assert.strictEqual(true, validator.isInt(String(data.subscribe)));
      assert.strictEqual(true, data.openid === process.env.APP_OPENID);
      assert.strictEqual(true, typeof data.nickname === 'string');
      assert.strictEqual(true, typeof data.sex === 'number');
      assert.strictEqual(true, validator.isInt(String(data.sex)));
      assert.strictEqual(true, typeof data.language === 'string');
      assert.strictEqual(true, typeof data.city === 'string');
      assert.strictEqual(true, typeof data.country === 'string');
      if (data.headimgurl) {
        assert.strictEqual(true, validator.isURL(data.headimgurl));
      }
      done();
    });
  });

  it('should be able to list users without openid', function(done) {
    nodeWeixinUser.list(settings, app, null, function(error, data) {
      assert.strictEqual(true, !error);
      assert.strictEqual(true, data.total >= 1);
      assert.strictEqual(true, data.count >= 1);
      if (data.data && data.data.openid) {
        assert.strictEqual(true, data.data.openid.length >= 0);
      }
      done();
    });
  });

  it('should be able to list users', function(done) {
    nodeWeixinUser.list(settings, app, process.env.APP_OPENID, function(error, data) {
      assert.strictEqual(true, !error);
      assert.strictEqual(true, data.total >= 0);
      assert.strictEqual(true, data.count >= 0);
      if (data.data && data.data.openid) {
        assert.strictEqual(true, data.data.openid.length >= 0);
      }
      done();
    });
  });

  it('should be able to move to a new group', function(done) {
    nodeWeixinUser.group.move(settings, app, gGroup.id, process.env.APP_OPENID, function(error, data) {
      assert.strictEqual(true, !error);
      if (data.errcode !== 40050) {
        assert.strictEqual(true, data.errcode === 0);
        assert.strictEqual(true, data.errmsg === 'ok');
      }
      done();
    });
  });

  it('should be able to remove a group', function(done) {
    nodeWeixinUser.group.remove(settings, app, gGroup.id, function(error) {
      assert.strictEqual(true, !error);
      done();
    });
  });

  it('should be failed to get', function(done) {
    var get = require('../lib/get');
    get(settings, app, 'https://you.abc.cc.com/', {}, function(error) {
      assert.strictEqual(true, error);
      done();
    });
  });
});
