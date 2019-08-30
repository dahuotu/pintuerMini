/**
 * 作者：大火兔 1979788761@qq.com
 * 时间：2019-05-18
 * 功能：浏览器内核检测
 * 描述：支持node环境下，node，vue，react,angular,由于小程序权限控制暂不支持,如有其它方法欢迎联系作者提供
 * 特别说明:本JS插件库只兼容支持HTML5的浏览器，包括移动端、PC端，最低兼容IE9及以上。
 **/

// /**
//  * API配置信息
//  */
// var browser = {
//   ua: navigator.userAgent,
//   app: navigator.appVersion,
//   language: (navigator.browserLanguage || navigator.language).toLowerCase(),
//   versions: {
//     //IE内核
//     ie: this.ua.indexOf('Trident') > -1,
//     //opera内核
//     opera: this.ua.indexOf('Presto') > -1,
//     //苹果、谷歌内核
//     webkit: this.ua.indexOf('AppleWebKit') > -1,
//     //火狐内核
//     firefox: this.ua.indexOf('Gecko') > -1 && this.ua.indexOf('KHTML') == -1,
//     //是否为移动终端
//     mobile: !!this.ua.match(/AppleWebKit.*Mobile.*/),
//     //ios终端
//     ios: !!this.ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
//     //android终端
//     android: this.ua.indexOf('Android') > -1 || this.ua.indexOf('Adr') > -1,
//     //是否为iPhone或者QQHD浏览器
//     iPhone: this.ua.indexOf('iPhone') > -1,
//     //是否iPad
//     iPad: this.ua.indexOf('iPad') > -1,
//     //是否web应该程序，没有头部与底部
//     webApp: this.ua.indexOf('Safari') == -1,
//     //是否微信 （2015-01-22新增）
//     weixin: this.ua.indexOf('MicroMessenger') > -1,
//     //是否QQ
//     qq: this.ua.match(/\sQQ/i) == "qq"
//   },
// };

// module.exports = browser;