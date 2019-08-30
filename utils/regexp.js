/**
 * 作者：大火兔 1979788761@qq.com
 * 时间：2019-05-18
 * 功能：正则表达式操作
 * 描述：支持node环境下，node，vue，react,angular,小程序
 * 特别说明:本JS插件库只兼容支持HTML5的浏览器，包括移动端、PC端，最低兼容IE9及以上。
 **/

import $regexs from "./regexs";

var regexp = {

  /**
   * 正则手机系统 例如iOS/Androa
   */
  system: function(data) {
    return this.exec($regexs.extension.system, data)[0];
  },

  /**
   * 正则手机系统版本号
   */
  version: function(data) {
    return this.exec($regexs.extension.version, data)[0];
  },

  /**
   * 基础正则-正则搜索
   */
  search: function(reg, data) {
    return data.search(reg);
  },

  /**
   * 基础正则-正则替换
   */
  replace: function(reg, rep, data) {
    return data.replace(reg, rep);
  },

  /**
   * 基础正则-是否匹配
   */
  test: function(reg, data) {
    return reg.test(data);
  },

  /**
   * 基础正则-匹配单个字符串
   */
  exec: function(reg, data) {
    return reg.exec(data);
  },
};

module.exports = regexp;