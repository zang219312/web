// * 1.1
/* function checkName() {  }
function checkEmail() {  }
function checkPwd() {  } */

// * 1.2

/* var checkName = function () {  }
var checkEmail = function () {  }
var checkPwd = function () {  } */

// * 1.3
/* const  checkObj = {
  checkName(){},
  checkEmail(){},
  checkPwd(){}
}  */

// * 1.4 对象的另一种形式
/* let CheckObj = function () {};
CheckObj.checkName = function () {};
CheckObj.checkEmail = function () {};
CheckObj.checkPwd = function () {
  return '验证密码';
};
//  新创建的对象还不能继承上面的方法
console.log(new CheckObj()); */

// * 1.5 真假对象

let checkObj = function () {
  return {
    checkName() {},
    checkEmail() {
      return '检查邮箱';
    },
    checkPwd() {},
  };
};

// 当每次调用这个函数时都返回了一个新对象，这样执行过程中明面上是checkObj对象，实际上是返回的新对象
let a = checkObj();
console.log(a, a.checkEmail());
console.log('--------------------------1.6--------------------------');

// * 1.6 类也可以
// 上面的不是一个真正意义上类的创建方式，并且创建的a和checkObj没有任何关系
// 改造如下：
let CheckObj = function () {
  this.checkName = function () {
    return '检查姓名';
  };
  this.checkEmail = function () {};
  this.checkPwd = function () {};
};
let b = new CheckObj();
console.log(b.checkName());

console.log('--------------------------1.7--------------------------');
// * 1.7 一个检测类
/**
 * 把所有的方法放在函数内部，通过this定义，所以每一次通过new关键字创建新的对象时，新创建的对象都会对类的this上的属性进行复制。
 * 所以这些新创建的对象都会有自己的一套方法，有的时候这么做造成的消耗是很奢侈的，
 * 处理如下：
 */

// 方法1：

const checkObject = function () {};

checkObject.prototype.checkName = function () {};
checkObject.prototype.checkEmail = function () {
  return 'checkEmail';
};
checkObject.prototype.checkPwd = function () {};

console.log(new checkObject());

// 方法2：
const checkObject2 = function () {};

checkObject.prototype = {
  checkName2() {},
  checkEmail2() {
    return '检查邮箱';
  },
  checkPwd2() {
    return '检查密码';
  },
};
let aa = new checkObject();
console.log(aa);

// * 这两种方法不能混用，一旦混用，如在后面为对象的原型对象赋值新对象时，那么它将覆盖之前对prototype对象赋值的方法

console.log(aa.checkName2());
console.log(aa.checkEmail2());
console.log(aa.checkPwd2());

// * 1.8 方法还可以这样用
// 上面调用了三个方法，对象aa写了三遍。这是可以避免的，那就要在声明 的每一个方法末尾将但前对象返回，在javascript中this指向的就是当前对象
// 第一个例子：

const checkObj2 = {
  checkName() {
    return this;
  },
  checkEmail() {
    return this;
  },
  checkPwd() {
    return this;
  },
};

checkObj2.checkName().checkEmail().checkPwd();

// 同样的方法可以放在类的原型对象中
const checkObj3 = function () {};
checkObj3.prototype = {
  checkName: function () {
    return this;
  },
  checkEmail: function () {
    return this;
  },
  checkPwd: function () {
    console.log('password');
    return this;
  },
};

new checkObj3().checkName().checkEmail().checkPwd();

// * 1.9 函数的祖先  
// 如果想对每一个函数都添加一个检测邮箱的方法
Function.prototype.checkEmail_fun = function () {
  console.log('this is checkEmail');
};
// console.log(Function === checkObject.constructor); // true

// 使用1:
let f = function () {};
f.checkEmail_fun();

// 2:
let f2 = new Function();
f2.checkEmail_fun();

/**
 * 但是这么做污染了原生对象 Function, 所以别人创建的函数也会被你创建的函数所污染，造成不必要的开销，
 * 但你可以抽象出一个统一添加方法的功能方法。
 */
Function.prototype.addMethod = function (name, fn) {
  this[name] = fn;
};
let methods1 = function () {};
let methods2 = new Function();

methods1.addMethod('checkName', function (res) {
  console.log('res1',res);
});
methods2.addMethod('checkEmail', function (res) {
  console.log('res2',res);
});
methods1.checkName();
methods2.checkEmail();
console.log(methods1.prototype);
console.log(methods2.prototype);

// * 1.10

