/**
 * 深拷贝
 */

const obj1 = {
  age: 24,
  name: 'zd',
  address: {
    city: '杭州',
  },
  arr: ['a', 'b', 'c'],
};

const obj2 = deepClone(obj1);

obj2.address.city = 'wuhan';
obj2.arr[0] = 'true';
console.log(obj1);

/**
 *  深拷贝
 * @param {Object} obj 要拷贝的对象
 */
function deepClone(obj = {}) {
  if (typeof obj !== 'object' || obj == null) {
    return obj;
  }
  // 初始化返回结果
  let result;
  if (obj instanceof Array) {
    result = [];
  } else {
    result = {};
  }

  for (let key in obj) {
    // 保证 key 不是原型的属性
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key]);
    }
  }

  return result;
}
