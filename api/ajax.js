/**
 * 作者：大火兔 1979788761@qq.com
 * 时间：2019-05-18
 * 功能：Http请求
 * 描述：支持node环境下，node，vue，react,angular,小程序
 * 特别说明:本JS插件库只兼容支持HTML5的浏览器，包括移动端、PC端，最低兼容IE9及以上。
 **/


import $config from "/config";
import $http from "../utils/http";
import $debug from "../utils/debug";
import $global from "../store/global";

var ajax = {

  /**
   * 主机地址
   */
  host: $config.host,
  token: null,
  header: null,

  /**
   * 获取头部请求头
   */
  getHeader: function() {
    let that = this;
    if (that.token) {
      that.header = {
        'Content-Type': $http.contentType.json,
        'token': that.token
      };
    } else {
      that.header = {
        'Content-Type': $http.contentType.json
      };
    }
  },

  /**
   * 获取token
   */
  getToken: function() {
    let that = this;
    if (that.token) {
      that.token = "";
    }
  },


  /**
   * 默认Get请求
   */
  get: function(url, data = {}, fnSuccess) {
    this.getJson(url, data, fnSuccess);
  },

  /**
   * 是否优先本地缓存GET请求
   */
  getLocal: function(url, data = {}, fnSuccess) {
    this.getJson(url, data, function(res) {
      if (fnSuccess) {
        if (res.data.version) {
          //有版本号则检查本地是否存在该版本号数据
          let versionData = $global.getLocalApi(res.data.version);
          if (versionData) {
            return versionData;
          } else {
            $global.setLocalApi(res.data.version, res.data);
            return null;
          }
        } else {
          //请求数据没有版本号直接请求网络数据
          fnSuccess(res.data);
        }
      }
    });
  },

  /**
   * GET请求返回Json格式
   */
  getJson: function(url, data = {}, fnSuccess = null) {
    let that = this;
    $http.baseGet(url, data, that.header, $http.dataType.json, null, function(res) {
      if (fnSuccess) {
        fnSuccess(res.data);
      }
    }, null, null);
  },

  /**
   * 默认Post请求
   */
  post: function(url, data = {}, fnSuccess) {
    $http.generalPost(url, data, fnSuccess);
  },

  /**
   * 以Json方式Post请求
   */
  postJson: function(url, data = {}, fnSuccess) {
    let that = this;
    $http.basePost(url, data, that.header, $http.dataType.json, null, function(res) {
      if (fnSuccess) {
        fnSuccess(res.data);
      }
    }, null, null);
  },

};

module.exports = ajax;