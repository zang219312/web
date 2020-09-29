// 模拟bind

Function.prototype.mybind = function () {
  const arr = Array.prototype.slice.call(arguments);
  // 取出 this （第一项）
  let t = arr.shift();
  // fn1.bind(...) 中的fn1
  const self = this;

  return function () {
    return self.apply(t, arr);
  };
};

function fn1(a, b, c) {
  console.log('this', this);
  console.log(a, b, c);
  return 'this is fn1';
}

const fn2 = fn1.mybind({ x: 100 }, 10, 20, 30);
let res = fn2();
console.log(res);
