#!/usr/bin/env bats

groupid=0

@test "should be able to create group" {
  run node cli.js group create --name newgroup --id $APP_ID --secret $APP_SECRET --token $APP_TOKEN
  echo "hello"
  [ "$status" -eq 0 ]
}

@test "should be able to get group" {
  run node cli.js group get --id $APP_ID --secret $APP_SECRET --token $APP_TOKEN
  [ "$status" -eq 0 ]
}

@test "should be able to get group of user" {
  run node cli.js group in --openid $APP_OPENID --id $APP_ID --secret $APP_SECRET --token $APP_TOKEN
  [ "$status" -eq 0 ]
}

@test "should be able to update a group" {
  run node cli.js group update --groupid 100 --name name --id $APP_ID --secret $APP_SECRET --token $APP_TOKEN
  [ "$status" -eq 0 ]
}

@test "should be move to a new group" {
  run node cli.js group move --groupid 1 --openid $APP_OPENID --id $APP_ID --secret $APP_SECRET --token $APP_TOKEN
  [ "$status" -eq 0 ]
}

@test "should be able to remark" {
  run node cli.js remark --remark "remark" --openid $APP_OPENID --id $APP_ID --secret $APP_SECRET --token $APP_TOKEN
  [ "$status" -eq 0 ]
}

@test "should be able to get user profile" {
  run node cli.js profile --openid $APP_OPENID --id $APP_ID --secret $APP_SECRET --token $APP_TOKEN
  [ "$status" -eq 0 ]
}

@test "should be able to get user list without openid" {
  run node cli.js list --id $APP_ID --secret $APP_SECRET --token $APP_TOKEN
  [ "$status" -eq 0 ]
}

@test "should be able to get user list" {
  run node cli.js list --openid $APP_OPENID --id $APP_ID --secret $APP_SECRET --token $APP_TOKEN
  [ "$status" -eq 0 ]
}
