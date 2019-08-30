/**
 * 作者：大火兔 1979788761@qq.com
 * 时间：2019-05-18
 * 功能：store操作
 * 描述：支持node环境下，node，vue，react,angular,小程序
 * 特别说明:本JS插件库只兼容支持HTML5的浏览器，包括移动端、PC端，最低兼容IE9及以上。
 **/

var store = {

  /**
   * 同步获取指定数据缓
   */
  get: function(key) {
    let str = null;
    try {
      const value = wx.getStorageSync(key)
      if (value) {
        str = value;
      }
    } catch (e) {

    }
    return str;
  },

  /**
   * 同步获取指定JSON数据缓
   */
  getJson: function(key) {
    let obj = null;
    try {
      const value = wx.getStorageSync(key)
      if (value) {
        obj = JSON.parse(value);
      }
    } catch (e) {

    }
    return obj;
  },

  /**
   * 同步设置指定数据缓
   */
  set: function(key, value) {
    wx.setStorageSync(key, value);
  },

  /**
   * 同步设置指定数据缓以为JSON格式
   */
  setJson: function(key, value) {
    wx.setStorageSync(key, JSON.stringify(value));
  },

  /**
   * 同步删除指定KEY数据缓存
   */
  remove: function(key) {
    try {
      wx.removeStorageSync(key);
    } catch (e) {
      // Do something when catch error
    }
  },

  /**
   * 同步清除数据缓存
   */
  clear: function(reg, data) {
    wx.clearStorageSync();
  },
};

module.exports = store;