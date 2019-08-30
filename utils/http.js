/**
 * 作者：大火兔 1979788761@qq.com
 * 时间：2019-05-18
 * 功能：Http请求
 * 描述：支持node环境下，node，vue，react,angular,小程序
 * 特别说明:本JS插件库只兼容支持HTML5的浏览器，包括移动端、PC端，最低兼容IE9及以上。
 **/

var http = {
  /**
   * 请求头类型
   */
  method: {
    //HTTP 请求 OPTIONS
    options: 'OPTIONS',
    //HTTP 请求 GET
    get: 'GET',
    //HTTP 请求 HEAD
    head: 'HEAD',
    //HTTP 请求 POST
    post: 'POST',
    //HTTP 请求 PUT
    put: 'PUT',
    //HTTP 请求 DELETE
    delete: 'DELETE',
    //HTTP 请求 TRACE
    trace: 'TRACE',
    //HTTP 请求 CONNECT
    connect: 'CONNECT'
  },
  /**
   * 请求头类型
   */
  contentType: {
    //默认
    none: 'application/x-www-form-urlencoded; charset=utf-8',
    //text/xml
    text: 'text/xml; charset=utf-8',
    //json
    json: 'application/json; charset=utf-8',
    //form表单
    form: 'multipart/form-data; charset=utf-8',
  },
  /**
   * 返回字符串类型
   */
  dataType: {
    //返回纯文本字符串
    text: "text",
    //返回XML字符串
    xml: "xml",
    //返回HTML字符串（包含的script标签会在插入dom时执行）
    html: "html",
    //返回JavaScript代码
    script: "script",
    //返回的数据为JSON
    json: 'json',
    //返回JSONP
    jsonp: "jsonp",
  },

  /**
   * 响应的数据格式
   */
  responseType: {
    //响应的数据为文本	
    text: 'text',
    //响应的数据为ArrayBuffer
    arraybuffer: 'arraybuffer'
  },

  /**
   * 默认Get请求
   */
  get: function(url, data = {}, fnSuccess) {
    this.getJson(url, data, fnSuccess);
  },

  /**
   * GET请求返回纯文本格式
   */
  getText: function(url, data = {}, fnSuccess = null) {
    let header = {
      'Content-Type': this.contentType.json
    };
    this.baseGet(url, data, header, this.dataType.text, null, function(res) {
      if (fnSuccess) {
        fnSuccess(res.data);
      }
    }, null, null);
  },

  /**
   * GET请求返回HTML格式
   */
  getHtml: function(url, data = {}, fnSuccess = null) {
    let header = {
      'Content-Type': this.contentType.json
    };
    this.baseGet(url, data, header, this.dataType.html, null, function(res) {
      if (fnSuccess) {
        fnSuccess(res.data);
      }
    }, null, null);
  },

  /**
   * GET请求返回XML格式
   */
  getXml: function(url, data = {}, fnSuccess = null) {
    let header = {
      'Content-Type': this.contentType.json
    };
    this.baseGet(url, data, header, this.dataType.xml, null, function(res) {
      if (fnSuccess) {
        fnSuccess(res.data);
      }
    }, null, null);
  },

  /**
   * GET请求返回Javascript格式
   */
  getScript: function(url, data = {}, fnSuccess = null) {
    let header = {
      'Content-Type': this.contentType.json,
    };
    this.baseGet(url, data, header, this.dataType.script, null, function(res) {
      if (fnSuccess) {
        fnSuccess(res.data);
      }
    }, null, null);
  },

  /**
   * GET请求返回Json格式
   */
  getJson: function(url, data = {}, fnSuccess = null) {
    let header = {
      'Content-Type': this.contentType.json,
    };
    this.baseGet(url, data, header, this.dataType.json, null, function(res) {
      if (fnSuccess) {
        //没有版本号直接返回请求数据
        fnSuccess(res.data);
      }
    }, null, null);
  },

  /**
   * GET请求返回Jsonp格式
   */
  getJsonp: function(url, data = {}, fnSuccess = null) {
    let header = {
      'Content-Type': this.contentType.json,
    };
    this.baseGet(url, data, header, this.dataType.jsonp, null, function(res) {
      if (fnSuccess) {
        fnSuccess(res.data);
      }
    }, null, null);
  },

  /**
   * 基础GET请求
   */
  baseGet: function(url, data = {}, header, dataType, fnBefore = null, fnSuccess = null, fnFail = null, fnComplete = null) {
    this.baseAjax(url, data, header, this.method.get, dataType, this.responseType.text, fnBefore, fnSuccess, fnFail, fnComplete);
  },

  /**
   * 默认Post请求
   */
  post: function(url, data = {}, fnSuccess) {
    this.generalPost(url, data, fnSuccess);
  },

  /**
   * 以默认方式Post请求
   */
  generalPost: function(url, data = {}, fnSuccess = null) {
    let header = {
      'Content-Type': this.contentType.none,
    };
    this.basePost(url, data, header, this.dataType.json, null, function(res) {
      if (fnSuccess) {
        fnSuccess(res.data);
      }
    }, null, null);
  },

  /**
   * 以text/xml方式Post请求
   */
  textPost: function(url, data = {}, fnSuccess = null) {
    let header = {
      'Content-Type': this.contentType.text,
    };
    this.basePost(url, data, header, this.dataType.json, null, function(res) {
      if (fnSuccess) {
        fnSuccess(res.data);
      }
    }, null, null);
  },

  /**
   * 以Form表单方式Post请求
   */
  formPost: function(url, data = {}, fnSuccess = null) {
    let header = {
      'Content-Type': this.contentType.form,
    };
    this.basePost(url, data, header, this.dataType.json, null, function(res) {
      if (fnSuccess) {
        fnSuccess(res.data);
      }
    }, null, null);
  },

  /**
   * 以Json方式Post请求
   */
  jsonPost: function(url, data = {}, fnSuccess = null) {
    let header = {
      'Content-Type': this.contentType.json,
    };
    this.basePost(url, data, header, this.dataType.json, null, function(res) {
      if (fnSuccess) {
        fnSuccess(res.data);
      }
    }, null, null);
  },

  /**
   * 基础POST请求
   */
  basePost: function(url, data = {}, header, dataType, fnBefore = null, fnSuccess = null, fnFail = null, fnComplete = null) {
    this.baseAjax(url, data, header, this.method.post, dataType, this.responseType.text, fnBefore, fnSuccess, fnFail, fnComplete);
  },

  /**
   * 基础Put请求及其他类型的请求请复制该方法自行扩展
   */
  basePut: function(url, data = {}, header, dataType, fnBefore = null, fnSuccess = null, fnFail = null, fnComplete = null) {
    this.baseAjax(url, data, header, this.method.put, dataType, this.responseType.text, fnBefore, fnSuccess, fnFail, fnComplete);
  },

  /**
   * 基础AJAX请求
   */
  baseAjax: function(url, data, header, method, dataType, responseType, fnBefore = null, fnSuccess = null, fnFail = null, fnComplete = null) {
    if (fnBefore) {
      //执行请求之前
      fnBefore();
    }

    wx.request({
      url: url,
      data: data,
      header: header,
      method: method,
      dataType: dataType,
      responseType: responseType,
      success: function(res) {
        //成功
        if (fnSuccess) {
          fnSuccess(res);
        }
      },
      fail: function(res) {
        //错误
        if (fnFail) {
          fnFail(res);
        }
      },
      complete: function(res) {
        //完成
        if (fnComplete) {
          fnComplete(res);
        }
      },
    });
  },

};

module.exports = http;