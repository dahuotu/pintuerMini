/**
 * 作者：大火兔 1979788761@qq.com
 * 时间：2019-05-28
 * 功能：API调用实例
 * 描述：支持node环境下，node，vue，react,angular,小程序
 * 特别说明:本JS插件库只兼容支持HTML5的浏览器，包括移动端、PC端，最低兼容IE9及以上。
 **/

import $ajax from "../api/ajax";

/**
 * 主机地址 
 */
const host = $ajax.host;

var url = {
  example: `${host}/json/example.json`,
};

var example = {

  /**
   * 实例
   */
  getExample: function(data = {}, fn) {
    $ajax.get(url.example, data, fn);
  },
};

module.exports = example;