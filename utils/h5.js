/**
 * 作者：大火兔 1979788761@qq.com
 * 时间：2019-05-18
 * 功能：H5常用工具库
 * 描述：支持node环境下，node，vue，react,angular,小程序
 * 特别说明:本JS插件库只兼容支持HTML5的浏览器，包括移动端、PC端，最低兼容IE9及以上。
 **/

var h5 = {

  /**
   * 测试
   */
  min: function() {

  },

  /**
   * 获取当前页面路径
   */
  currentPageUrl: function() {
    var currentPageUrl = "";
    if (typeof this.href === "undefined") {
      currentPageUrl = document.location.toString().toLowerCase();
    } else {
      currentPageUrl = this.href.toString().toLowerCase();
    }
  },

  /**
   * 加入收藏夹
   */
  addFavorite: function(sURL, sTitle) {
    try {
      window.external.addFavorite(sURL, sTitle)
    } catch (e) {
      try {
        window.sidebar.addPanel(sTitle, sURL, "")
      } catch (e) {
        alert("加入收藏失败，请使用Ctrl+D进行添加")
      }
    }
  },

  /**
   * 设为首页
   */
  setHomepage: function() {
    if (document.all) {
      document.body.style.behavior = 'url(#default#homepage)';
      document.body.setHomePage('http://w3cboy.com')
    } else if (window.sidebar) {
      if (window.netscape) {
        try {
          netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
        } catch (e) {
          alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true")
        }
      }
      var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
      prefs.setCharPref('browser.startup.homepage', 'http://w3cboy.com')
    }
  },
  
};

module.exports = h5;