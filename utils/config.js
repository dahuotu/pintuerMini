/**
 * 作者：大火兔 1979788761@qq.com
 * 时间：2019-05-18
 * 功能：全局配置信息
 * 描述：支持node环境下，node，vue，react,angular,小程序
 * 特别说明:本JS插件库只兼容支持HTML5的浏览器，包括移动端、PC端，最低兼容IE9及以上。
 **/

/**
 * API配置信息
 */
var api = {
  //开发环境
  dev: 'http://192.168.88.84:8020/MinPrograms',
  //测试环境
  beta: '#',
  //正式环境
  release: '#',
};

/**
 * 埋点日志API配置信息
 */
var logApi = {
  //测试环境
  beta: {
    uba: 'TUAB1.0.4',
    host: '#'
  },
  //正式环境
  release: {
    uba: 'UAB1.0.4',
    host: '#'
  },
};

/**
 * 全局配置信息
 */
var config = {
  //调试状态,false 关闭,true 开启，默认开启
  debug: true,
  host: api.dev,
  track: logApi.beta,
};

module.exports = config;