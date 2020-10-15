/**
 * 返回日期数列里与目标数列最近的日期下标
 */
const getNearestDateIndex = (targetDate, dates) => {
  if (!targetDate || !dates) {
    throw new Error('Argument(s) is illegal !');
  }
  if (!dates.length) {
    return -1;
  }
  const distances = dates.map((date) => Math.abs(date - targetDate));
  return distances.indexOf(Math.min(...distances));
};

const targetDate = new Date(2019, 7, 20);
const dates = [
  new Date(2018, 0, 1),
  new Date(2019, 0, 1),
  new Date(2020, 0, 1),
];
// 2
console.log(getNearestDateIndex(targetDate, dates));

/**
 * 返回日期数列里最小的日期
 */

const getMinDate = (dates) => {
  if (!dates) {
    throw new Error('Argument(s) is illegal !');
  }
  if (!dates.length) {
    return dates;
  }
  return new Date(Math.min.apply(null, dates)).toISOString();
};

// e.g.
const dates2 = [
  new Date(2018, 3, 10),
  new Date(2019, 3, 10),
  new Date(2020, 3, 10),
];
// 2018-04-09T16:00:00.000Z
console.log(getMinDate(dates2));

/**
 * 打乱数组
 */

const arrayShuffle = (array) => {
  if (!Array.isArray(array)) {
    throw new Error('Argument must be an array');
  }
  let end = array.length;
  if (!end) {
    return array;
  }
  while (end) {
    let start = Math.floor(Math.random() * end--);
    [array[start], array[end]] = [array[end], array[start]];
  }
  return array;
};

// e.g.
console.log(arrayShuffle([1, 2, 3, 4, 5, 6, 7]));

/**
 * 判断是否支持webp图片格式
 */

/* const canUseWebp = () => (document.createElement('canvas').toDataURL('image/webp', 0.5).indexOf('data:image/webp') === 0)

// 新版的chrome里为true，火狐里为false
console.log(canUseWebp()); */

/**
 * 判断是否是url
 */

const isUrl = (str) =>
  /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/.test(
    str
  );

// e.g.
console.log(isUrl('https://www.baidu.com')); // true
console.log(isUrl('https://www')); // false

/**
 * 判断是否是emoji
 */

const isEmoji = (str) =>
  /(\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f\ude80-\udeff])|[\u2600-\u2B55]/g.test(
    str
  );

// e.g.
isEmoji('🌏'); // true
isEmoji('earth'); // false

/**
 * 连字符转驼峰
 */

const toCamelCase = (str = '', separator = '-') => {
  if (typeof str !== 'string') {
    throw new Error('Argument must be a string');
  }
  if (str === '') {
    return str;
  }
  const newExp = new RegExp('\\-(\\w)', 'g');
  return str.replace(newExp, (matched, $1) => {
    return $1.toUpperCase();
  });
};

// e.g.
console.log(toCamelCase('hello-world')); // helloWorld

/**
 * 驼峰转连字符
 */

const fromCamelCase = (str = '', separator = '-') => {
  if (typeof str !== 'string') {
    throw new Error('Argument must be a string');
  }
  if (str === '') {
    return str;
  }
  return str.replace(/([A-Z])/g, `${separator}$1`).toLowerCase();
};

// e.g.
console.log(fromCamelCase('helloWorld')); // hello-world

/**
 * 等级判断
 */

const getLevel = (value = 0, ratio = 50, levels = '一二三四五') => {
  if (typeof value !== 'number') {
    throw new Error('Argument must be a number');
  }
  const levelHash = '一二三四五'.split('');
  const max = levelHash[levelHash.length - 1];
  return levelHash[Math.floor(value / ratio)] || max;
};

console.log(getLevel(0)); // 一
console.log(getLevel(54)); // 二
console.log(getLevel(77)); // 二

/**
 * 事件模拟触发
 */
/* const event = new Event('click')
const body = document.querySelector('body')
body.addEventListener('click', ev => {
  console.log('biu')
}, false)
body.addEventListener('touchmove', ev => {
  body.dispatchEvent(event)
}, false) */

/**
 * 判断dom是否相等
 */

const isEqualNode = (dom1, dom2) => dom1.isEqualNode(dom2);

// <div>这是第一个div</div>
// <div>这是第二个div</div>
// <div>这是第一个div</div>

/* const [一, 二, 三, ] = document.getElementsByTagName('div')

// e.g.
isEqualNode(一, 二) // false
isEqualNode(一, 三) // true
isEqualNode(二, 三) // false */

/**
 * 多属性双向绑定
 */
/*
    <div id="box" class="box" style="border: 1px solid; width: 100px; height: 100px;"></div>
    <output id="output" name="output"></output>
*/
/* const keys = Object.values(box.attributes).map(({
  name,
  value
}) => ({
  name,
  value,
}));
const cacheData = {};
const properties = keys.reduce((acc, cur) => {
  const obj = {};
  cacheData[cur.name] = box.attributes[cur.name];
  obj[cur.name] = {
    get() {
      return cacheData[cur.name];
    },
    set(data) {
      output.value = `${cur.name}: ${data}`;
      cacheData[cur.name] = data;
    },
  };
  return {
    ...acc,
    ...obj,
  };
}, {});
Object.defineProperties(box, properties); */

// 当我们修改input相应的属性时，output文字就会变成修改的内容

/**
 * 获取指定范围内的随机数
 */

const getRandom = (min = 0, max = 100) => {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('Argument(s) is illegal !');
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// e.g.
getRandom(1, 100); // 89
getRandom(1, 100); // 5

/**
 * 文件尺寸格式化
 */

const formatSize = (size) => {
  if (typeof + size !== 'number') {
    throw new Error('Argument(s) is illegal !');
  }
  const unitsHash = 'B,KB,MB,GB'.split(',');
  let index = 0;
  while (size > 1024 && index < unitsHash.length) {
    size /= 1024;
    index++;
  }
  return Math.round(size * 100) / 100 + unitsHash[index];
};
formatSize('10240'); // 10KB
formatSize('10240000'); // 9.77MB

/**
 * 获取数组前/后指定数量元素
 */

const arrayRange = (array, index, distance = '+') => {
  if (!Array.isArray(array) || typeof index !== 'number' || index < 0) {
    throw new TypeError('Argument(s) is illegal');
  }
  return array.slice(0, `${distance}${index}`);
};

console.log(arrayRange(['a', 'b', 'c'], 2)); // ["a", "b"]
console.log(arrayRange(['a', 'b', 'c'], 2, '-')); // ["a"]


let userInfo = {
  "openid": "o2UMu5colPb9FreiSgSvmkDO9PHM",
  "userId": "U20200921150207387713",
  "userName": "新用户",
  "nickname": null,
  "userIdCard": null,
  "userPhone": "13647129407",
  "userType": 0,
  "sex": null,
  "age": null,
  "userRemark": "",
  "token": "FD1547595AA560666ABA413B9FFEAC35"
}


Object.prototype.setAge = function () {
  this.age = 22;
};

console.log(Object.keys(userInfo).length); // 11

for (const key in userInfo) {
  // console.log(key); //12 原型链的属性也被遍历出来了

  if (userInfo.hasOwnProperty(key)) {
    console.log(key);
  }
}

userInfo.setAge();
console.log(userInfo);

const scrollbarWidth = getScrollbarWidth();
document.documentElement.style.setProperty('--scrollbar', `${scrollbarWidth}px`);