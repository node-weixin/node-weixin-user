#!/usr/bin/env node
'use strict';
var meow = require('meow');
var nodeWeixinUser = require('./');
var config = require('node-weixin-config');
var cli = meow({
  help: [
    'Usage',
    '  wxuser (list || profile) --openid openid --id appid --secret appsecret --token apptoken',
    '  wxuser remark --remark remark --openid openid --id appid --secret appsecret --token apptoken',
    '  wxuser group get --id appid --secret appsecret --token apptoken',
    '  wxuser group create --name name --id appid --secret appsecret --token apptoken',
    '  wxuser group in --openid openid --id appid --secret appsecret --token apptoken',
    '  wxuser group update --groupid groupid --name name --id appid --secret appsecret --token apptoken',
    '  wxuser group move --group groupid --openid openid --id appid --secret appsecret --token apptoken',
    '  wxuser group remove --group groupid --id appid --secret appsecret --token apptoken',
    '',
    'Example',
    '  wxuser list --id "wx111" --secret "wxSecret" --token "wxtoken"'
  ].join('\n')
});

config.app.init(cli.flags);
var app = cli.flags;
console.log(cli.input);
console.log(cli.flags);


var command = cli.input[0];

function callback(command, next) {
  return function (error, data) {
    if (error) {
      process.exit(1);
      console.log("Error occur: " + data);
    } else {
      console.info("Success on " + command + '!');
      console.info(data);
      if (data.errcode) {
        process.exit(1);
      }
      if (next) {
        next(data);
      }
    }
  };
}

switch (command) {
  case 'remark':
    var openid = cli.flags.openid;
    var remark = cli.flags.remark;
    nodeWeixinUser[command](app, openid, remark, callback(command));
    break;
  case 'list':
  case 'profile':
    var openid = cli.flags.openid || null;
    nodeWeixinUser[command](app, openid, callback(command));
    break;
  case 'group':
    var subCmd = cli.input[1];
    switch (subCmd) {
      case 'create':
        nodeWeixinUser[command][subCmd](app, cli.flags.name, callback(command));
        break;
      case 'get':
        nodeWeixinUser[command][subCmd](app, callback(command));
        break;
      case 'in':
        nodeWeixinUser[command][subCmd](app, cli.flags.openid, callback(command));
        break;
      case 'update':
        nodeWeixinUser[command][subCmd](app, cli.flags.groupid, cli.flags.name, callback(command));
        break;
      case 'move':
        nodeWeixinUser[command][subCmd](app, cli.flags.groupid, cli.flags.openid, callback(command));
        break;
      case 'remove':
        nodeWeixinUser[command][subCmd](app, cli.flags.groupid, callback(command));
        break;
    }
    break;
}
