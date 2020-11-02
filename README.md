# node-weixin-user [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]


> node weixin module for use or its management
微信用户API和命令行工具

微信用户API是([node-weixin-api](https://github.com/node-weixin/node-weixin-api) 或者 [node-weixin-express](https://github.com/node-weixin/node-weixin-express))的一个子项目。
它提供:

1. 菜单API共计19个:

  list: 列举订阅用户

  profile: 返回用户资料

  remark: 修改昵称

  group.get:  获取组列表

  group.create: 创建新组

  group.in: 获取用户组名

  group.update: 更新组名

  group.move: 修改用户组属性

  tags.create: 创建标签

  tags.get: 获取公众号已创建的标签

  tags.update: 编辑标签

  tags.remove: 删除标签

  tags.list: 获取标签下粉丝列表

  tags.tagUsers: 批量为用户打标签

  tags.untagUsers: 批量为用户取消标签

  tags.getTagIdList: 获取用户身上的标签列表

  tags.getBlackList: 获取公众号的黑名单列表

  tags.batchBlackList: 拉黑用户

  tags.batchUnblackList: 取消拉黑用户

2. 所有数据返回格式采用json,并与腾讯api上说明一致。回调函数格式如下：
    function(error, json) {
    //error为false表示返回正常
    //json对应api说明
    }

   正确时返回 JSON数据包
   ···js
   {
      "errcode": 0,
      "errmsg": "ok"
   }
   ···

交流QQ群: 39287176

注:

 [node-weixin-express](https://github.com/node-weixin/node-weixin-express)是基于node-weixin-*的服务器端参考实现。

 [node-weixin-api](https://github.com/node-weixin/node-weixin-api)是基于node-weixin-*的API接口SDK。

 它们都是由下列子项目组合而成:

 1. [node-weixin-config](https://github.com/node-weixin/node-weixin-config)
    用于微信配置信息的校验

 2. [node-weixin-auth](https://github.com/node-weixin/node-weixin-auth)
    用于与微信服务器握手检验

 3. [node-weixin-util](https://github.com/node-weixin/node-weixin-util)
    一些常用的微信请求，加密，解密，检验的功能与处理

 4. [node-weixin-request](https://github.com/node-weixin/node-weixin-request)
    微信的各类服务的HTTP请求的抽象集合

 5. [node-weixin-oauth](https://github.com/node-weixin/node-weixin-oauth)
    微信OAuth相关的操作

 6. [node-weixin-pay](https://github.com/node-weixin/node-weixin-pay)
    微信支付的服务器接口

 7. [node-weixin-jssdk](https://github.com/node-weixin/node-weixin-jssdk)
    微信JSSDK相关的服务器接口

 8. [node-weixin-menu](https://github.com/node-weixin/node-weixin-menu)
    微信菜单相关的操作与命令

## Install

```sh
$ npm install --save node-weixin-user
```

## Usage

```js
var nodeWeixinUser = require('node-weixin-user');
var settings = require('node-weixin-settings');
  var app = {
    id: process.env.APP_ID,
    secret: process.env.APP_SECRET,
    token: process.env.APP_TOKEN
  };
  var auth = require("node-weixin-auth");
  var config = require("node-weixin-config");
  config.app.init(app);

  //用户操作
  //更新备注
  nodeWeixinUser.remark(settings, app, process.env.APP_OPENID, '新备注', function (error, data) {
  });

  //获取用户信息
  nodeWeixinUser.profile(settings, app, process.env.APP_OPENID, function (error, data) {
  });

  //获取用户列表
  nodeWeixinUser.list(settings, app, null, function (error, data) {
  });

  //组操作
  //获取组信息
  nodeWeixinUser.group.get(settings, app, function (error, data) {
  });

  //创建组
  nodeWeixinUser.group.create(settings, app, 'hello', function (error, data) {
  });

  //获取用户组名
  nodeWeixinUser.group.in(settings, app, openid, function (error, data) {
  });

  //更新组信息
  nodeWeixinUser.group.update(settings, app, gGroup.id, 'new name', function (error, data) {
  });

  //移动用户组属性
  nodeWeixinUser.group.move(settings, app, gGroup.id, process.env.APP_OPENID, function (error, data) {
  });

  //标签操作
  //创建标签
  nodeWeixinUser.tags.create(settings, app, name, function (error, data)) {
  });

  //获取公众号已创建的标签
  nodeWeixinUser.tags.get(settings, app, function (error, data)) {
  });

  //编辑标签
  nodeWeixinUser.tags.update(settings, app, tagId, newName, function (error, data)) {
  });

  //删除标签
  nodeWeixinUser.tags.remove(settings, app, tagId, function (error, data)) {
  });

  //获取标签下粉丝列表
  nodeWeixinUser.tags.list(settings, app, tagId, openId, function (error, data)) {
  });

  //批量为用户打标签
  nodeWeixinUser.tags.tagUsers(settings, app, tagId, OpenIdList, function (error, data)) {
  });

  //批量为用户取消标签
  nodeWeixinUser.tags.untagUsers(settings, app, tagId, OpenIdList, function (error, data)) {
  });

  //获取用户身上的标签列表
  nodeWeixinUser.tags.getTagIdList(settings, app, openId, function (error, data)) {
  });

  //黑名单管理
  //获取公众号的黑名单列表
  nodeWeixinUser.tags.getBlackList(settings, app, openId, function (error, data)) {
  });
  
  //拉黑用户
  nodeWeixinUser.tags.batchBlackList(settings, app, OpenIdList, function (error, data)) {
  });

  //取消拉黑用户
  nodeWeixinUser.tags.batchUnblackList(settings, app, OpenIdList, function (error, data)) {
  });

```

## License

Apache-2.0 © [calidion](calidion.github.io)


[npm-image]: https://badge.fury.io/js/node-weixin-user.svg
[npm-url]: https://npmjs.org/package/node-weixin-user
[travis-image]: https://travis-ci.org/node-weixin/node-weixin-user.svg?branch=master
[travis-url]: https://travis-ci.org/node-weixin/node-weixin-user
[daviddm-image]: https://david-dm.org/node-weixin/node-weixin-user.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/node-weixin/node-weixin-user
[coveralls-image]: https://coveralls.io/repos/node-weixin/node-weixin-user/badge.svg
[coveralls-url]: https://coveralls.io/r/node-weixin/node-weixin-user
