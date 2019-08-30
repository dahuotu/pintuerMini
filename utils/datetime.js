/**
 * 作者：大火兔 1979788761@qq.com
 * 时间：2019-05-18
 * 功能：日期、时间库
 * 描述：支持node环境下，node，vue，react,angular,小程序
 * 特别说明:本JS插件库只兼容支持HTML5的浏览器，包括移动端、PC端，最低兼容IE9及以上。
 **/

var datetime = {

  /**
   * 随机数时间戳
   */
  randomTime: function() {
    var a = Math.random,
      b = parseInt;
    return Number(new Date()).toString() + b(10 * a()) + b(10 * a()) + b(10 * a());
  },

  /**
   * 获取指定时间的毫秒值 年、月、日、时、分、秒
   */
  getMillisecondValue: function(year, month, day, hour, minute, second) {
    var date = new Date(year, month - 1, day, hour, minute, second);
    return date.getTime();
  },

  /**
   * 单数变换 如：8 -> 08
   */
  formatNumber: function(n) {
    n = n.toString()
    return n[1] ? n : '0' + n;
  },

  /**
   * 单数变换 如：08 -> 8 注意：仅针对2位数
   */
  formatNumber2: function(n) {
    n = n.toString();
    return n[0] == 0 ? n[1] : n;
  },

  /**
   * Date 格式化成 2018-07-11 15:23:08 格式
   */
  formatTime: function(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return [year, month, day].map(this.formatNumber).join('-') + ' ' + [hour, minute, second].map(this.formatNumber).join(':');
  },

  /**
   * Date 格式化成 2018-07-11 15:23:08 类似格式 但是 - 和 : 为指定的字符
   */
  formatTimeJoin: function(date, dateJoin, timeJoin) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return [year, month, day].map(this.formatNumber).join(dateJoin) + ' ' + [hour, minute, second].map(this.formatNumber).join(timeJoin);
  },

  /**
   * 时间戳 格式化成 2018-07-11 格式
   */
  formatDate: function(longTime) {
    var date = new Date(longTime);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return [year, month, day].map(this.formatNumber).join('-');
  },

  /**
   * 时间戳 格式化成 2018-07-11 类似格式 但是 - 为指定的字符
   */
  formatDateJoin: function(longTime, dateJoin) {
    var date = new Date(longTime);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return [year, month, day].map(this.formatNumber).join(dateJoin);
  },

  /**
   * 时间戳 格式化成 2018-07-11 15:23:08 格式
   */
  formatDateAndTime: function(longTime) {
    return this.formatTime(new Date(longTime));
  },

  /**
   * 时间戳 格式化成 2018-07-11 15:23:08 类似格式 但是 - 和 : 为指定的字符
   */
  formatDateAndTimeJoin: function(longTime, dateJoin, timeJoin) {
    return this.formatTimeJoin(new Date(longTime), dateJoin, timeJoin);
  },

  /**
   * 在传递的时间戳基础上对 年、月、日、时、分、秒 进行 增加或减少操作。返回：
   * result[0] ：变换后的 年
   * result[1] ：变换后的 月
   * result[2] ：变换后的 日
   * result[3] ：变换后的 时
   * result[4] ：变换后的 分
   * result[5] ：变换后的 秒
   */
  dateTimeChange: function(longTime, addYearCount, addMonthCount, addDayCount, addHourCount, addMinCount, addSecondCount) {
    var date = new Date(longTime);
    date.setFullYear(date.getFullYear() + parseInt(addYearCount));
    date.setMonth(date.getMonth() + parseInt(addMonthCount));
    date.setDate(date.getDate() + parseInt(addDayCount));
    date.setHours(date.getHours() + parseInt(addHourCount));
    date.setMinutes(date.getMinutes() + parseInt(addMinCount));
    date.setSeconds(date.getSeconds() + parseInt(addSecondCount));

    var result = [];
    result[0] = date.getFullYear();
    result[1] = date.getMonth() + 1; // 获取当前月份的日期
    result[2] = date.getDate();
    result[3] = date.getHours();
    result[4] = date.getMinutes();
    result[5] = date.getSeconds();
    return result.map(this.formatNumber);
  },

  /**
   * 在传递的时间戳基础上对 年、月、日 进行 增加或减少操作。返回：
   * result[0] ：变换后的 年
   * result[1] ：变换后的 月
   * result[2] ：变换后的 日
   */
  dateChange: function(longTime, addYearCount, addMonthCount, addDayCount) {
    return this.dateTimeChange(longTime, addYearCount, addMonthCount, addDayCount, 0, 0, 0);
  },

  /**
   * 在传递的时间戳基础上对 时、分、秒 进行 增加或减少操作。返回：
   * result[0] ：变换后的 时
   * result[1] ：变换后的 分
   * result[2] ：变换后的 秒
   */
  timeChange: function(longTime, addHourCount, addMinCount, addSecondCount) {
    var temp = this.dateTimeChange(longTime, 0, 0, 0, addHourCount, addMinCount, addSecondCount);
    var result = [];
    result[0] = temp[3];
    result[1] = temp[4];
    result[2] = temp[5];
    return result;
  },

  /**
   * 在传递的时间戳基础上对月份进行增加或减少操作。返回：
   * result[0] ：变换后的 年
   * result[1] ：变换后的 月
   * result[2] ：变换后的 月的第一天
   * result[3] ：变换后的 月的最后一天
   */
  monthStartAndEnd: function(longTime, addMonthCount) {
    var temp = this.dateChange(longTime, 0, addMonthCount, 0);
    var firstDay = new Date(temp[0], temp[1] - 1, 1);
    var lastDay = new Date(temp[0], temp[1], 0);

    var result = [];
    result[0] = temp[0];
    result[1] = temp[1];
    result[2] = firstDay.getDate();
    result[3] = lastDay.getDate();
    return result.map(this.formatNumber);
  },

  /**
   * 在传递的时间戳基础上对年份进行增加或减少操作。返回：
   * result[0] ：变换后的 年
   * result[1] ：变换后的 年的第一月
   * result[2] ：变换后的 年的第一天
   * result[3] ：变换后的 年的最后一月
   * result[4] ：变换后的 年的最后一天
   */
  yearStartAndEnd: function(longTime, addYearCount) {
    var temp = this.dateChange(longTime, addYearCount, 0, 0);
    var result = [];
    result[0] = temp[0];
    result[1] = 1;
    result[2] = 31;
    result[3] = 12;
    result[4] = 31;
    return result.map(this.formatNumber);
  },

  /**
   * 通过时间戳返回 年、月、日、时、分、秒 返回：
   * result[0] ：年
   * result[1] ：月
   * result[2] ：日
   * result[3] ：时
   * result[4] ：分
   * result[5] ：秒
   */
  getDateFormLong: function(longTime) {
    var date = new Date(longTime);

    var result = [];
    result[0] = date.getFullYear();
    result[1] = date.getMonth() + 1; // 获取当前月份的日期 
    result[2] = date.getDate();
    result[3] = date.getHours();
    result[4] = date.getMinutes();
    result[5] = date.getSeconds();

    return result.map(this.formatNumber);
  },

  /**
   * 获取当前时间的 年、月、日、时、分、秒 返回：
   * result[0] ：年
   * result[1] ：月
   * result[2] ：日
   * result[3] ：时
   * result[4] ：分
   * result[5] ：秒
   */
  getDate: function() {
    var date = new Date();
    var result = [];
    result[0] = date.getFullYear();
    result[1] = date.getMonth() + 1; // 获取当前月份的日期 
    result[2] = date.getDate();
    result[3] = date.getHours();
    result[4] = date.getMinutes();
    result[5] = date.getSeconds();

    return result.map(this.formatNumber);
  },

  /**
   * 获取从某一时间开始未来 count 天的时间日期 年-月-日 2018-02-08
   */
  getFutureDate1: function(longTime, count) {
    var result = [];
    for (var i = 0; i < count; i++) {
      var temp = this.dateChange(longTime, 0, 0, i);
      result[i] = temp[0] + "-" + temp[1] + "-" + temp[2];
    }
    return result;
  },

  /**
   * 获取从某一时间开始未来 count 天的时间日期 年-月-日 2018-02-08  其中分隔符 - 为 参数3指定的符号
   */
  getFutureDate1Join: function(longTime, count, dateJoin) {
    var result = [];
    for (var i = 0; i < count; i++) {
      var temp = this.dateChange(longTime, 0, 0, i);
      result[i] = temp[0] + dateJoin + temp[1] + dateJoin + temp[2];
    }
    return result;
  },

  /**
   * 获取从某一时间开始未来 count 天的时间日期 日 8
   */
  getFutureDate2: function(longTime, count) {
    var result = [];
    for (var i = 0; i < count; i++) {
      var temp = this.dateChange(longTime, 0, 0, i);
      temp = temp.map(this.formatNumber2);
      result[i] = temp[2];
    }

    return result;
  },

  /**
   * 获取给定时间戳的月份的日期数组 返回 result[] 包含这个月中的每一天日期，包含年和月 2018-01-02,...
   */
  getDaysOfMonth1: function(longTime) {
    var result = [];
    var temp = this.monthStartAndEnd(longTime, 0);

    var newLongTime = new Date(temp[0], temp[1] - 1, temp[2]).getTime();

    var dayCount = temp[3] - temp[2] + 1; // 当前月一共的天数

    for (var i = 0; i < dayCount; i++) {
      var temp = this.dateChange(newLongTime, 0, 0, i);
      result[i] = temp[0] + "-" + temp[1] + "-" + temp[2];
    }

    return result;
  },

  /**
   * 获取给定时间戳的月份的日期数组 返回 result[] 包含这个月中的每一天日期，包含年和月 2018-01-02,... 其中分隔符 - 为 参数2指定的符号
   */
  getDaysOfMonth1Join: function(longTime, dateJoin) {
    var result = [];
    var temp = this.monthStartAndEnd(longTime, 0);

    var newLongTime = new Date(temp[0], temp[1] - 1, temp[2]).getTime();

    var dayCount = temp[3] - temp[2] + 1; // 当前月一共的天数

    for (var i = 0; i < dayCount; i++) {
      var temp = this.dateChange(newLongTime, 0, 0, i);
      result[i] = temp[0] + dateJoin + temp[1] + dateJoin + temp[2];
    }

    return result;
  },

  /**
   * 获取给定时间戳的月份的日期数组 返回 result[] 包含这个月中的每一天日期，只有日期 1,2,3...
   */
  getDaysOfMonth2: function(longTime) {
    var result = []
    var temp = this.monthStartAndEnd(longTime, 0);

    var dayCount = temp[3] - temp[2] + 1; // 当前月一共的天数

    for (var i = 0; i < dayCount; i++) {
      result[i] = i + 1;
    }

    return result;
  },

  /**
   * 将时间值 秒 转化为 几小时 几分钟的形式  参数1：毫秒值 参数2：默认值
   */
  formatTimeValue: function(ss, defaultValue) {
    var SS_MILLS_COUNT = 1000; // 毫秒
    var MI_MILLS_COUNT = SS_MILLS_COUNT * 60; // 分钟
    var HH_MILLS_COUNT = MI_MILLS_COUNT * 60; // 小时
    var DD_MILLS_COUNT = HH_MILLS_COUNT * 24; // 天

    ss = ss * SS_MILLS_COUNT; // 将秒变为毫秒
    var duration = defaultValue;
    var minutes = Math.floor(ss / MI_MILLS_COUNT);
    // 分钟
    var hours = Math.floor(ss / HH_MILLS_COUNT);
    // 小时
    var days = Math.floor(ss / DD_MILLS_COUNT);
    // 天
    if (days > 0) {
      var tHours = hours - days * 24;
      var tMinutes = minutes - tHours * 60 - days * 24 * 60;
      duration = days + "天" + tHours + "小时" + tMinutes + "分钟";
    } else if (hours > 0) {
      var tMinutes = minutes - hours * 60;
      duration = hours + "小时" + tMinutes + "分钟";
    } else if (minutes > 0) {
      duration = minutes + "分钟";
    } else {
      duration = defaultValue;
    }
    return duration;
  },

  /**
   * 小时变换  参数1：小时数 参数2：变换值
   */
  hourChange: function(hour, count) {
    return this.timeChange(this.getMillisecondValue(2019, 1, 1, hour, 0, 0), count, 0, 0)[0];
  },

  /**   
   * 时间转10位时间戳,兼容ios
   **/
  timetoTimeStamp: function(time) {
    var tmp = Date.parse(time.replace(/-/g, "/")).toString(); // .replace(/-/g, "/") 兼容ios
    tmp = tmp.substr(0, 10);
    return tmp; //返回时间戳
  },

};

module.exports = datetime;