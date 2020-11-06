/**
 * 封装的目的是将信息隐藏。一般而言，我们讨论的封装是封装数据和封装实现。这一节将讨论更广义的封装，
 * 不仅包括封装数据和封装实现，还包括封装类型和封装变化
 */
//* 1、封装数据
// JavaScript 并没有提供对这些关键字的支持，我们只能依赖变量的作用域来实现封装特性，
// 而且只能模拟出 public 和 private 这两种封装性。
// 除了 ECMAScript 6 中提供的 let 之外，一般我们通过函数来创建作用域
var myObject = (function () {
  var _name = 'zd'; // 私有private 变量
  return {
    getName() { // 公开public方法
      return _name;
    }
  }
})();
console.log(myObject.getName()); //zd
console.log(myObject._name); //undefined


// * 2、封装实现
// 例如：迭代器
// 封装使得对象之间松耦合，对象之间只通过暴露的API来通信

// * 3、封装类型
// 一般而言，封装类型是通过抽象类和接口来进行的
// JavaScript 并没有对抽象类和接口的支持

// * 4、封装变化