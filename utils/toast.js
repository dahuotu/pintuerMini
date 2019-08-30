/**
 * 作者：大火兔 1979788761@qq.com
 * 时间：2019-05-18
 * 功能：弹出提示
 * 描述：支持node环境下，node，vue，react,angular,小程序
 * 特别说明:本JS插件库只兼容支持HTML5的浏览器，包括移动端、PC端，最低兼容IE9及以上。
 **/

var toast = {
  duration: 1500,
  mask: true,
  icons: {
    //警告图片路径
    warn: '',
    //错误图片路径
    error: '',
  },
  loading: function(msg = '', fn) {
    //加载消息
    let that = this;
    wx.showToast({
      title: msg,
      icon: 'loading',
      duration: that.duration,
      mask: that.mask,
      success: function() {
        if (fn) {
          setTimeout(function() {
            fn();
          }, that.duration);
        }
      }
    });
  },
  msg: function(msg, fn) {
    //普通消息
    let that = this;
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: that.duration,
      mask: that.mask,
      success: function() {
        if (fn) {
          setTimeout(function() {
            fn();
          }, that.duration);
        }
      }
    });
  },
  success: function(msg, fn) {
    //成功消息
    let that = this;
    wx.showToast({
      title: msg,
      icon: 'success',
      duration: that.duration,
      mask: that.mask,
      success: function() {
        if (fn) {
          setTimeout(function() {
            fn();
          }, that.duration);
        }
      }
    });
  },
  warn: function(msg, fn) {
    //警告消息
    let that = this;
    wx.showToast({
      title: msg,
      image: that.icons.warn,
      duration: that.duration,
      mask: that.mask,
      success: function() {
        if (fn) {
          setTimeout(function() {
            fn();
          }, that.duration);
        }
      }
    });
  },
  error: function(msg, fn) {
    //错误消息
    let that = this;
    wx.showToast({
      title: msg,
      image: that.icons.error,
      duration: duration,
      mask: mask,
      success: function() {
        if (fn) {
          setTimeout(function() {
            fn();
          }, that.duration);
        }
      }
    });
  },
  alert: function(msg, cancel = false, fn) {
    //弹出提示
    let that = this;
    wx.showModal({
      content: msg,
      showCancel: cancel,
      success: function() {
        if (fn) {
          setTimeout(function() {
            fn();
          }, that.duration);
        }
      }
    });
  },
  modal: function(msg, param = 'msg', cancel = false) {
    //对话框
    wx.showModal({
      title: msg,
      content: param,
      showCancel: cancel
    })
  },
  showLoading: function(param = 'Loading', mask = this.mask) {
    //显示加载层
    wx.showLoading({
      title: param,
      mask: mask
    });
  },
  hideLoading: function(duration = this.duration) {
    //隐藏加载层
    let that = this;
    setTimeout(() => {
      wx.hideLoading()
    }, duration);
  },
};

module.exports = toast;