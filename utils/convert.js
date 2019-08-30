/**
 * 作者：大火兔 1979788761@qq.com
 * 时间：2019-05-18
 * 功能：格式转换工具库
 * 描述：支持node环境下，node，vue，react,angular,小程序
 * 特别说明:本JS插件库只兼容支持HTML5的浏览器，包括移动端、PC端，最低兼容IE9及以上。
 **/

var convert = {

  /**
   * 用于判断空，Undefined String Array Object
   */
  isEmpty: function(str) {
    if (Object.prototype.toString.call(str) === '[object Undefined]') { //空
      return true
    } else if (str == null || str == 'null') {
      return true
    } else if (
      Object.prototype.toString.call(str) === '[object String]' ||
      Object.prototype.toString.call(str) === '[object Array]') { //字条串或数组
      return str.length == 0 ? true : false
    } else if (Object.prototype.toString.call(str) === '[object Object]') {
      return JSON.stringify(str) == '{}' ? true : false
    } else {
      return true
    }
  },

  /**
   * 处理空字符串
   */
  handlerString: function(msg) {
    if (msg == null || this.isEmpty(msg))
      return "";

    if (Object.prototype.toString.call(msg) === '[object String]') {
      return msg.length == 0 ? "" : msg;
    }

    return "";
  },

  /**
   * 处理多个空字符串
   */
  handlerStrings: function() {
    if (arguments == null || arguments.length <= 0)
      return "";

    var result = "";
    for (var i = 0; i < arguments.length; i++) {
      result += this.handlerString(arguments[i]);
    }

    return result;
  },

  /**
   * 替换字符串(只替换第一个出现的位置)
   */
  replace: function(oldStr, oldChar, newChar) {
    if (oldStr == null || this.isEmpty(oldStr))
      return "";

    return oldStr.replace(oldChar, newChar);
  },

  /**
   * 替换字符串(全部替换)
   */
  replaceAll: function(oldStr, oldChar, newChar) {
    if (oldStr == null || this.isEmpty(oldStr))
      return ""

    var reg = new RegExp(oldChar, "g");
    return oldStr.replace(reg, newChar);
  },

  /**
   * 清除左空格
   */
  lTrim: function(s) {
    return s.replace(/^(\s*|　*)/, "");
  },

  /**
   * 清除右空格
   */
  rTrim: function(s) {
    return s.replace(/(\s*|　*)$/, "");
  },

  /**
   * 清除脚本内容
   */
  clearScript: function(value) {
    return value.replace(/<script.*?>.*?<\/script>/ig, '');
  },

  /**
   * 转义html标签
   */
  htmlEncode: function(value) {
    return value.replace(/&/g, '&').replace(/\"/g, '"').replace(/</g, '<').replace(/>/g, '>');
  },

  /**
   * 压缩CSS样式代码
   */
  compressCss: function(s) {
    //压缩代码
    s = s.replace(/\/\*(.|\n)*?\*\//g, ""); //删除注释
    s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
    s = s.replace(/\,[\s\.\#\d]*\{/g, "{"); //容错处理
    s = s.replace(/;\s*;/g, ";"); //清除连续分号
    s = s.match(/^\s*(\S+(\s+\S+)*)\s*$/); //去掉首尾空白
    return (s == null) ? "" : s[1];
  },

  /**
   * utf8解码
   */
  utf8Decode: function(str_data) {
    var tmp_arr = [],
      i = 0,
      ac = 0,
      c1 = 0,
      c2 = 0,
      c3 = 0;
    str_data += '';
    while (i < str_data.length) {
      c1 = str_data.charCodeAt(i);
      if (c1 < 128) {
        tmp_arr[ac++] = String.fromCharCode(c1);
        i++;
      } else if (c1 > 191 && c1 < 224) {
        c2 = str_data.charCodeAt(i + 1);
        tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = str_data.charCodeAt(i + 1);
        c3 = str_data.charCodeAt(i + 2);
        tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return tmp_arr.join('');
  },

  /**
   * base64解码
   */
  base64Decode: function(data) {
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
      ac = 0,
      dec = "",
      tmp_arr = [];
    if (!data) {
      return data;
    }
    data += '';
    do {
      h1 = b64.indexOf(data.charAt(i++));
      h2 = b64.indexOf(data.charAt(i++));
      h3 = b64.indexOf(data.charAt(i++));
      h4 = b64.indexOf(data.charAt(i++));
      bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
      o1 = bits >> 16 & 0xff;
      o2 = bits >> 8 & 0xff;
      o3 = bits & 0xff;
      if (h3 == 64) {
        tmp_arr[ac++] = String.fromCharCode(o1);
      } else if (h4 == 64) {
        tmp_arr[ac++] = String.fromCharCode(o1, o2);
      } else {
        tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
      }
    } while (i < data.length);
    dec = tmp_arr.join('');
    dec = utf8Decode(dec);
    return dec;
  },

  /**
   * 金额处理，保留2位小数
   */
  returnMoney: function(value, defaultValue) {
    if (this.isEmpty(value + "")) return defaultValue

    var value = parseFloat(value) * 100 / 100;
    var xsd = value.toString().split(".");
    if (xsd.length == 1) {
      value = value.toString() + ".00";
      return value;
    }
    if (xsd.length > 1) {
      if (xsd[1].length < 2) {
        value = value.toString() + "0";
      } else if (xsd[1].length > 2) {
        value = xsd[0] + "." + xsd[1].substring(0, 2)
      }
      return value;
    }
  },

  /**
   * 金额转汉字大写
   */
  transForm: function(tranvalue) {
    try {
      var i = 1;
      var dw2 = new Array("", "万", "亿"); //大单位
      var dw1 = new Array("拾", "佰", "仟"); //小单位
      var dw = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //整数部分用
      //以下是小写转换成大写显示在合计大写的文本框中     
      //分离整数与小数
      var source = this.splitsNumber(tranvalue);
      var num = source[0];
      var dig = source[1];
      //转换整数部分
      var k1 = 0; //计小单位
      var k2 = 0; //计大单位
      var sum = 0;
      var str = "";
      var len = source[0].length; //整数的长度
      for (i = 1; i <= len; i++) {
        var n = source[0].charAt(len - i); //取得某个位数上的数字
        var bn = 0;
        if (len - i - 1 >= 0) {
          bn = source[0].charAt(len - i - 1); //取得某个位数前一位上的数字
        }
        sum = sum + Number(n);
        if (sum != 0) {
          str = dw[Number(n)].concat(str); //取得该数字对应的大写数字，并插入到str字符串的前面
          if (n == '0') sum = 0;
        }
        if (len - i - 1 >= 0) { //在数字范围内
          if (k1 != 3) { //加小单位
            if (bn != 0) {
              str = dw1[k1].concat(str);
            }
            k1++;
          } else { //不加小单位，加大单位
            k1 = 0;
            var temp = str.charAt(0);
            if (temp == "万" || temp == "亿") //若大单位前没有数字则舍去大单位
              str = str.substr(1, str.length - 1);
            str = dw2[k2].concat(str);
            sum = 0;
          }
        }
        if (k1 == 3) { //小单位到千则大单位进一
          k2++;
        }
      }
      //转换小数部分
      var strdig = "";
      if (dig != "") {
        var n = dig.charAt(0);
        if (n != 0) {
          strdig += dw[Number(n)] + "角"; //加数字
        }
        var n = dig.charAt(1);
        if (n != 0) {
          strdig += dw[Number(n)] + "分"; //加数字
        }
      }
      str += "元" + strdig;
    } catch (e) {
      return "0元";
    }
    return str;
  },

  /**
   * 拆分整数与小数
   */
  splitsNumber: function(tranvalue) {
    var value = new Array('', '');
    temp = tranvalue.split(".");
    for (var i = 0; i < temp.length; i++) {
      value = temp;
    }
    return value;
  },

  /**
   * 全角转换为半角函数
   */
  toCDB: function(str) {
    var result = '';
    for (var i = 0; i < str.length; i++) {
      code = str.charCodeAt(i);
      if (code >= 65281 && code <= 65374) {
        result += String.fromCharCode(str.charCodeAt(i) - 65248);
      } else if (code == 12288) {
        result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
      } else {
        result += str.charAt(i);
      }
    }
    return result;
  },

  /**
   * 半角转换为全角函数
   */
  toDBC: function(str) {
    var result = '';
    for (var i = 0; i < str.length; i++) {
      code = str.charCodeAt(i);
      if (code >= 33 && code <= 126) {
        result += String.fromCharCode(str.charCodeAt(i) + 65248);
      } else if (code == 32) {
        result += String.fromCharCode(str.charCodeAt(i) + 12288 - 32);
      } else {
        result += str.charAt(i);
      }
    }
    return result;
  },

  /**
   * 生成guid
   */
  guid: function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },
};

module.exports = convert;