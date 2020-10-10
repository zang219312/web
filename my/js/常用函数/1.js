function idCardValid(id) {
  const format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
  //号码规则校验
  if (!format.test(id)) {
    return {
      'status': 0,
      'msg': '身份证号码不合规'
    };
  }
  //区位码校验
  //出生年月日校验   前正则限制起始年份为1900;
  var year = id.substr(6, 4), //身份证年
    month = id.substr(10, 2), //身份证月
    date = id.substr(12, 2), //身份证日
    time = Date.parse(month + '-' + date + '-' + year), //身份证日期时间戳date
    now_time = Date.parse(new Date()), //当前时间戳
    dates = (new Date(year, month, 0)).getDate(); //身份证当月天数
  if (time > now_time || date > dates) {
    return {
      'status': 0,
      'msg': '出生日期不合规'
    }
  }
  //校验码判断
  var c = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //系数
  var b = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'); //校验码对照表
  var id_array = id.split("");
  var sum = 0;
  for (var k = 0; k < 17; k++) {
    sum += parseInt(id_array[k]) * parseInt(c[k]);
  }
  if (id_array[17].toUpperCase() != b[sum % 11].toUpperCase()) {
    return {
      'status': 0,
      'msg': '身份证校验码不合规'
    }
  }
  return {
    'status': 1,
    'msg': '校验通过'
  }
};

console.log(idCardValid('52030219891209794X')); // 通过
console.log(idCardValid('52030219891209794Y')); // 不通过


function isHKCard(card) {
  // 港澳居民来往内地通行证
  // 规则： H/M + 10位或6位数字
  // 样本： H1234567890
  var reg = /^([A-Z]\d{6,10}(\(\w{1}\))?)$/;
  if (reg.test(card) === false) {
    return {
      'status': 0,
      'msg': '港澳居民来往内地通行证号码不合规'
    }
  } else {
    return {
      'status': 1,
      'msg': '校验通过'
    }
  }
}

function isTWCard(card) {
  // 台湾居民来往大陆通行证
  // 规则： 新版8位或18位数字， 旧版10位数字 + 英文字母
  // 样本： 12345678 或 1234567890B
  var reg = /^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$/;
  if (reg.test(card) === false) {
    return {
      'status': 0,
      'msg': '台湾居民来往大陆通行证号码不合规'
    };
  } else {
    return {
      'status': 1,
      'msg': '校验通过'
    };
  }
}

function isPassPortCard(card) {
  // 护照
  // 规则： 14/15开头 + 7位数字, G + 8位数字, P + 7位数字, S/D + 7或8位数字,等
  // 样本： 141234567, G12345678, P1234567
  var reg = /^([a-zA-z]|[0-9]){5,17}$/;
  if (reg.test(card) === false) {
    return {
      'status': 0,
      'msg': '护照号码不合规'
    };
  } else {
    return {
      'status': 1,
      'msg': '校验通过'
    };
  }
}

function isOfficerCard(card) {
  // 军官证
  // 规则： 军/兵/士/文/职/广/（其他中文） + "字第" + 4到8位字母或数字 + "号"
  // 样本： 军字第2001988号, 士字第P011816X号
  var reg = /^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$/;
  if (reg.test(card) === false) {
    return {
      'status': 0,
      'msg': '军官证号不合规'
    };
  } else {
    return {
      'status': 1,
      'msg': '校验通过'
    };
  }
}


function isAccountCard(card) {
  // 户口本
  // 规则： 15位数字, 18位数字, 17位数字 + X
  // 样本： 441421999707223115
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (reg.test(card) === false) {
    return {
      'status': 0,
      'msg': '户口本号码不合规'
    };
  } else {
    return {
      'status': 1,
      'msg': '校验通过'
    };
  }
}