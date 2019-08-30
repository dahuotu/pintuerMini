/**
 * 作者：大火兔 1979788761@qq.com
 * 时间：2019-05-18
 * 功能：表单验证工具库
 * 描述：支持node环境下，node，vue，react,angular,小程序
 * 特别说明:本JS插件库只兼容支持HTML5的浏览器，包括移动端、PC端，最低兼容IE9及以上。
 **/
import $regexs from "./regexs";

var validate = {

  /**
   * 用于判断空，Undefined String Array Object
   */
  isEmpty: function(str) {
    if (Object.prototype.toString.call(str) === '[object Undefined]') { //空
      return true;
    } else if (str == null || str == 'null') {
      return true;
    } else if (
      Object.prototype.toString.call(str) === '[object String]' ||
      Object.prototype.toString.call(str) === '[object Array]') { //字条串或数组
      return str.length == 0 ? true : false;
    } else if (Object.prototype.toString.call(str) === '[object Object]') {
      return JSON.stringify(str) == '{}' ? true : false;
    } else {
      return true;
    }
  },

  /**
   * 判断多个字符串是否为 null，只要有一个为 null，就返回 true
   */
  isEmptys: function() {
    if (arguments == null || arguments.length <= 0)
      return true;

    for (var i = 0; i < arguments.length; i++) {
      if (this.isEmpty(arguments[i])) {
        return true;
      }
    }
    return false;
  },

  /**
   * 指定字段与内容是否相同
   */
  isSame: function(field, newField) {
    var value1 = this.backVal(field);
    var value2 = this.backVal(this.fields[newField].element);

    return value1 == value2;
  },

  /**
   * 拒绝与某个字段相等,比如登录密码与交易密码情况
   */
  isDifferent: function(field, newField) {
    return !this.isSame(field, newField);
  },

  /**
   * 判断字符串是否相等
   */
  isContains: function(field, value) {
    var value1 = this.backVal(field);
    return value1 == value;
  },

  /**
   * 验证合法邮箱
   */
  isEmail: function(field) {
    return $regexs.email.mail.test(this.backVal(field));
  },

  /**
   * 验证合法ip地址
   */
  isIp: function(field) {
    return $regexs.ip.ip4.test(this.backVal(field));
  },

  /**
   * 验证传真
   */
  isFax: function(field) {
    return $regexs.phone.fax.test(this.backVal(field));
  },

  /**
   * 验证座机
   */
  isTel: function(field) {
    return $regexs.phone.tel.test(this.backVal(field));
  },

  /**
   * 验证手机
   */
  isPhone: function(field) {
    return $regexs.phone.mobile.test(this.backVal(field));
  },

  /**
   * 验证身份证号码
   */
  isIdCard: function(field) {
    return $regexs.idcard.n18.test(this.backVal(field));
  },

  /**
   * 验证URL
   */
  isUrl: function(field) {
    return $regexs.link.url.test(this.backVal(field));
  },

  /**
   * 验证货币
   */
  isMoney: function(field) {
    return $regexs.number.money.test(this.backVal(field));
  },

  /**
   * 验证英文字母
   */
  isEnglish: function(field) {
    return $regexs.string.english.test(this.backVal(field));
  },

  /**
   * 验证中文
   */
  isChinese: function(field) {
    return $regexs.string.chinese.test(this.backVal(field));
  },

  /**
   * 验证百分比
   */
  isPercent: function(field) {
    return $regexs.number.percent.test(this.backVal(field));
  },

  /**
   * 验证日期格式
   */
  isDate: function(field) {
    return $regexs.datetime.date.test(this.backVal(field));
  },

  /**
   * 验证ISO类型的日期格式
   */
  isIosDate: function(field) {
    return $regexs.datetime.iosdate.test(this.backVal(field));
  },

  /**
   * 验证十进制数字
   */
  isNumber: function(field) {
    return $regexs.number.int.test(this.backVal(field));
  },

  /**
   * 验证最大长度
   */
  maxLength: function(field, length) {
    if ($regexs.number.int.test(length)) return false;
    return (this.backVal(field).length <= parseInt(length, 10));
  },

  /**
   * 验证最小长度
   */
  minLength: function(field, length) {
    if ($regexs.number.int.test(length)) return false;
    return (this.backVal(field).length >= parseInt(length, 10));
  },

  /**
   * [backVal 判断 field 是否为字符串 ]
   * @param  {[type]}              [Object or String]
   * @return {[type]}              [String]
   */
  backVal: function(field) {
    return (typeof field === 'string') ? field : field.value;
  },
};

module.exports = validate;