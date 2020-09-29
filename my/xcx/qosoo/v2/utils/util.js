function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
 * now:当前时间的时间戳
 */
function formatTimeTwo(number, format, now) {
  var timerStr;
  if (now) {
    let leadTime = parseInt(now / 1000) - number;

    if (leadTime <= 1) {
      // 时间差小与1s
      timerStr = '刚刚';
    } else if (leadTime <= 60) {
      //1分钟内
      timerStr = leadTime + 's前';
    } else if (leadTime <= 60 * 60) {
      //一小时内
      timerStr = Math.ceil(leadTime / 60) + '分钟前';
    } else if (leadTime <= 60 * 60 * 12) {
      //12小时内
      timerStr = Math.ceil(leadTime / (60 * 60)) + '小时前';
    } else if (leadTime <= 60 * 60 * 24) {
      //一天内
      timerStr = '1天内';
    } else {
      timerStr = ''
    }

    // if (leadTime <= 60 * 60 * 24 * 30) {
    //   //一月内
    //   timerStr = Math.ceil(leadTime / (60 * 60 * 24)) + '天前';
    // }
    return timerStr;
  } else if (format) {
    var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    var returnArr = [];

    var date = new Date(number * 1000);
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));

    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));

    for (var i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
  }

}

// 解析链接中的参数
let getQueryString = function(url, name) {
  console.log("url = " + url)
  console.log("name = " + name)
  var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i')
  var r = url.substr(1).match(reg)
  if (r != null) {
    console.log("r = " + r)
    console.log("r[2] = " + r[2])
    return r[2]
  }
  return null;
}

// 函数节流
function throttle(fn,interval=300){
  var endTime = 0; // 触发的时间
  var gapTime = interval; //间隔时间
  return  function(){
    var _this  = this;
    var backTime = new Date();  //函数第一次触发的时间
    if(backTime -endTime > gapTime){
      fn.call(_this,arguments);
      endTime = backTime;  // 更新触发的时间
    }
  }
}

// 函数防抖
function debounce(fn, interval = 300){
  var timer;
  var gapTime = interval; //间隔时间
  return function(){
    clearTimeout(timer);
    var _this = this;
    var args = arguments;//保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的
    timer = setTimeout(function(){
      fn.call(_this,args)
    },gapTime)
  }
}

module.exports = {
  formatTime: formatTime, // 日期转时间戳
  formatTimeTwo: formatTimeTwo, // 时间戳转日期
  getQueryString: getQueryString, //解析链接中的参数
  throttle: throttle,  //函数节流
  debounce: debounce
}