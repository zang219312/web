class jQuery {
  constructor(selector) {
    const result = document.querySelectorAll(selector);
    const len = result.length;
    for (let i = 0; i < len; i++) {
      this[i] = result[i];
    }
    this.length = len;
    this.selector = selector;
  }
  get(index) {
    return this[index];
  }

  each(fn) {
    for (let i = 0; i < this.length; i++) {
      const elem = this[i];
      fn(elem);
    }
  }

  on(type, fn) {
    return this.each((elem) => {
      elem.addEventListener(type, fn, false);
    });
  }

  // 扩展 DOM API
}

// 插件
jQuery.prototype.dialog = function (data) {
  console.log(data);
};

// '造轮子'
class myJQuery extends jQuery {
  constructor(selector) {
    super(selector);
  }
  addClass() {}
  style() {}
}

// // 深拷贝
// const obj1 = {
//   name: 'swk',
//   age: '500',
//   address: {
//     city: '五指山',
//   },
//   hobby: ['桃子', '香蕉'],
// };

// const obj2 = deepClone(obj1);
// obj1.name = 'ts';
// obj1.address.city = '流沙河';
// console.log('obj1 ', obj1);
// console.log('obj2 ', obj2);

// function deepClone(obj = {}) {
//   if (typeof obj !== 'object' || obj == null) {
//     return obj;
//   }

//   let res;
//   if (obj instanceof Array) {
//     res = [];
//   } else {
//     res = {};
//   }

//   for (const key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       res[key] = deepClone(obj[key]);
//     }
//   }
//   return res;
// }
