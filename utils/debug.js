/**
 * 作者：大火兔 1979788761@qq.com
 * 时间：2019-05-18
 * 功能：日志调试
 * 描述：支持node环境下，node，vue，react,angular,小程序
 * 特别说明:本JS插件库只兼容支持HTML5的浏览器，包括移动端、PC端，最低兼容IE9及以上。
 **/
import $config from "./config";

var debug = {

  /**
   * 调试状态,false 关闭,true 开启，默认开启
   */
  state: $config.debug,

  /**
   * 日志
   */
  log: function(msg) {
    if (this.state == true) {
      console.log(msg);
    }
  },

  /**
   * 信息
   */
  info: function(msg) {
    if (this.state == true) {
      console.info(msg);
    }
  },

  /**
   * 错误
   */
  error: function(msg) {
    if (this.state == true) {
      console.error(msg);
    }
  },

  /**
   * 警告
   */
  warn: function(msg) {
    if (this.state == true) {
      console.warn(msg);
    }
  },

  /**
   * 查看对象的信息
   */
  dir: function(json) {
    if (this.state == true) {
      console.dir(json);
    }
  },

  /**
   * 查看HTML元素某节点信息
   */
  dirxml: function(node) {
    if (this.state == true) {
      console.dirxml(node);
    }
  },

  /**
   * 查看函数执行时间
   */
  runtime: function(fn) {
    if (this.state == true) {
      console.time("该函数执行时间");
      fn();
      console.timeEnd("该函数执行时间");
    }
  },
};

module.exports = debug;