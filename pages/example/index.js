//example.js 

//两种导入模块方式任选
//var $util = require('../../utils/index.js');
//var $debug = require('../../utils/debug.js');
//var $store = require('../../utils/store.js');

import $debug from '../../utils/debug';
import $browser from '../../utils/browser';
import $api from '../../api/example';


Page({
  data: {
    example: []
  },
  onLoad: function() {
    let that = this;
    $debug.runtime(function() {
      //调用接口示例
      $api.getExample({}, function(res) {
        console.log(res);
      });
    });
  }
})