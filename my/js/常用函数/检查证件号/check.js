class Check {
  //* 护照验证
  // * 护照有四种类型：普通护照、公务护照、澳门特别行政区护照和香港特别行政区护照四种类型，不同的护照类型护照号码格式也是不一样的。
  // * 1. 普通护照：E+8 位数字编号
  // * 2. 公务电子护照，公务护照又分为公务、公务普通和外交护照三个类别
  // *    公务护照：SE+7 位数字编码
  // *    外交护照：DE+7 位数字编码
  // *    公务普通护照：PE+7 位数字编码
  // * 3. 澳门特别行政区护照：MA+7 位编号
  // * 4. 香港特别行政区护照：K+8 位编号
  checkPassport(str) {
    var pattern = /^([EK]\d{8}|(SE|DE|PE|MA)\d{7})$/;
    return pattern.test(str);
  }

  //* 港澳通行证
  //* 新版（电子版）港澳通行证证件号码就是右上角 C 开头的数字
  //* 新版卡式证件号 C 开头，后面 8 位数字
  //* 旧版本式证件号 W 开头，将于 2019 年 9 月 13 日全部失效。
  checkGangAo(str) {
    var pattern = /^[CW]\d{8}$/;
    return pattern.test(str);
  }
  /* 
    新版的台胞证已经和大陆身份证已经实现无缝对接，格式实现统一了。
    其编码规则与中国大陆身份证相同，均为 18 位数，使用 830000 开头。
    旧版的台胞证证号为 10 个数字 + 1 个英文字母组合而成。
    其中後面英文字母代表是发证机关所在地。
    一、常见的有 (B) 跟 (D) 两种：
    1、(B) 为中国旅行社香港分公司所发的台胞证 (加签)。
    2、(D) 为中国旅行社澳门分公司所发的台胞证 (加签)。
    3、(A) 为外交部驻香港特别行政区所发的台胞证 (加签)。 */
  checkTaiBao(str) {
    var pattern = /^(?:(830000(?:19|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}[\dX])|\d{10}[DAB])$/;
    return pattern.test(str);
  }
}

let res = new Check();
console.log(res.checkPassport('E12345678'));
console.log(res.checkGangAo('C12352698'));
console.log(res.checkGangAo('C12352698'));