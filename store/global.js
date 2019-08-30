/**
 * 作者：大火兔 1979788761@qq.com
 * 时间：2019-05-18
 * 功能：store信息
 * 描述：支持node环境下，node，vue，react,angular,小程序
 * 特别说明:本JS插件库只兼容支持HTML5的浏览器，包括移动端、PC端，最低兼容IE9及以上。
 **/
import $store from '../utils/store';
import $regexp from '../utils/regexp';

//用户信息
var user = {
  uid: 'NULL',
  nickname: 'NULL',
  token: 'NULL'
};

//小程序信息 
var app = {
  userAgent: 'NULL',
  appVersion: "NULL",
  build: 'NULL'
};

//设备信息
var device = {
  //系统类型 iOS/Android
  system: 'NULL',
  //系统版本号
  osVersion: 'NULL',
  osType: 'NULL',
  //设备ID
  deviceId: 'NULL',
  //IMEI
  imei: 'NULL',
  //品牌
  brand: 'NULL',
  //品牌型号
  deviceModel: 'NULL',
  //网络类型
  network: 'NULL',
  //平台
  platform: 'NULL'
};


//存储信息配置
var global = {

  /**
   * 获取设备信息
   */
  getDevice: function() {
    return $store.getJson("MIN_DEVICE");
  },

  /**
   * 设置设备信息
   */
  setDevice: function() {
    try {
      const res = wx.getSystemInfoSync()
      device.system = $regexp.system(res.system);
      device.osVersion = $regexp.version(res.system);
      device.osType = 'NULL';
      device.deviceId = 'NULL';
      device.imei = 'NULL';
      device.brand = res.brand;
      device.deviceModel = res.model;
      wx.getNetworkType({
        success(res) {
          device.network = res.networkType;
        }
      });
      device.platform = res.platform;
    } catch (e) {
      // Do something when catch error
    }
    //设置设备信息
    $store.setJson("MIN_DEVICE", device);
  },

  /**
   * 获取APP信息
   */
  getApp: function() {
    return $store.getJson("MIN_APP");
  },

  /**
   * 设置APP信息
   */
  setApp: function() {
    try {
      const res = wx.getSystemInfoSync()
      app.appVersion = res.version;
      app.build = res.SDKVersion;
    } catch (e) {
      // Do something when catch error
    }
    //设置APP信息
    $store.setJson("MIN_APP", app);
  },

  /**
   * 获取小程序用户信息
   */
  getUser: function() {
    return $store.getJson("MIN_USER");
  },

  /**
   * 设置小程序用户信息
   */
  setUser: function() {
    user.uid = 'NULL';
    user.nickname = 'NULL';
    user.token = 'NULL';
    //设置小程序用户信息
    $store.setJson("MIN_USER", user);
  },

  /**
   * 根据版本号获取本地API数据
   */
  getLocalApi: function(version) {
    return $store.getJson(version);
  },

  /**
   * 根据版本号设置本地API数据
   */
  setLocalApi: function(version, data) {
    $store.setJson(version, data);
  },
};

module.exports = global;