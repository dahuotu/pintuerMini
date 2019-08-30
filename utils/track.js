/**
 * 作者：大火兔 1979788761@qq.com
 * 时间：2019-05-18
 * 功能：埋点日志
 * 描述：支持node环境下，node，vue，react,angular,小程序
 * 特别说明:本JS插件库只兼容支持HTML5的浏览器，包括移动端、PC端，最低兼容IE9及以上。
 **/

import $config from "./config";
import $debug from "./debug";
import $convert from "./convert";
import $datetime from "./datetime";
import $global from "../store/global";

const $device = $global.getDevice();
const $app = $global.getApp();
const $user = $global.getUser();
const $today = $datetime.getDate();

var track = {

  load: function(title, code) {
    //加载埋点
    $debug.log(title + ',' + code);

    let log = {
      goodsId: 'NULL',
      uid: 'NULL',
      time: 'NULL',
      deviceId: 'NULL',
      system: 'NULL',
      version: 'NULL',
      appVersion: 'NULL',
      network: 'NULL'
    };
    //设置埋点信息
    log.goodsId = title;
    log.uid = $user.uid;
    log.time = $today;
    log.deviceId = $device.deviceId;
    log.system = $device.system;
    log.version = $device.osVersion;
    log.appVersion = $app.appVersion;
    log.network = $device.network;
    //保存埋点
    this.save(log, "AOVB", title, code);
  },
  click: function(id, title, code) {
    //点击埋点
    $debug.log(id + ',' + title + ',' + code);

    let log = {
      goodsId: 'NULL',
      uid: 'NULL',
      time: 'NULL',
      deviceId: 'NULL',
      system: 'NULL',
      version: 'NULL',
      appVersion: 'NULL',
      network: 'NULL'
    };
    //设置埋点信息
    log.goodsId = id;
    log.uid = $user.uid;
    log.time = $today;
    log.deviceId = $device.deviceId;
    log.system = $device.system;
    log.version = $device.osVersion;
    log.appVersion = $app.appVersion;
    log.network = $device.network;
    //保存埋点
    this.save(log, "FCB", title, code);
  },
  save: function(logConfig, type, title, code) {
    //保存埋点
    let bidtime = $convert.guid();
    let log_st = '{"bid":"' + bidtime + '","code":"' + code + '","endTime":"' + logConfig.time + '","extendData1":"' + logConfig.goodsId + '","extendData2":"' + title + '","extendData3":"NULL","goodsActType":"NULL","marketChannel":"NULL","relationBid":"NULL","startTime":"' + logConfig.time + '","tag":"' + type + '"}"';
    this.ajax(logConfig, log_st);
  },
  ajax: function(logConfig, log) {
    //请求埋点
    let uab = $config.track.uab;
    let postUrl = $config.track.host;

    let config = '"' + logConfig.time + '" "' + logConfig.uid + '" "' + logConfig.deviceId + '" "' + logConfig.system + '" "' + logConfig.version + '" "' + logConfig.appVersion + '" "' + logConfig.network + '" "' + uab + '" "';
    let postText = config + log;
    $debug.log(id + ',' + title + ',' + code);
    //$request.post(postUrl, postText);
  }
};

module.exports = track;