`var makeSound = function (animal) {
  if (animal instanceof Duck) {
    console.log('嘎嘎嘎');
  } else if (animal instanceof Chicken) {
    console.log('咯咯咯');
  }
};
var Duck = function () {};
var Chicken = function () {};

makeSound(new Duck()); // 嘎嘎嘎
makeSound(new Chicken()); // 咯咯咯`

// * 这段代码确实体现了“多态性”，如果后来又增加了一只动物，比如狗，
// * 显然狗的叫声是“汪汪汪”，此时我们必须得改动 makeSound 函数，才能让狗也发出叫声。修改代码总是危险的，修改的地方越多，程序出错的可能性就越大，
// * 而且当动物的种类越 来越多时，makeSound 有可能变成一个巨大的函数。

/**
 * 多态背后的思想是将“做什么”和“谁去做以及怎样去做”分离开来，也就是将“不变的事物”与 “可能改变的事物”分离开来。
 * 在这个故事中，动物都会叫，这是不变的，但是不同类型的动物具体怎么叫是可变的。把不变的部分隔离出来，把可变的部分封装起来，
 * 这给予了我们扩展程序的能力，程序看起来是可生长的，也是符合开放—封闭原则的,相对于修改代码来说， 仅仅增加代码就能完成同样的功能，这显然优雅和安全得多。
 */

//  * 对象的多态性
// * 1.首先把不变的部分隔离出来，也就是所有的动物都会叫

var makeSound = function (animal) {
  animal.sound();
}
// * 2.把可变的部分各自封装起来
var Duck = function () {};
Duck.prototype.sound = function () {
  console.log('嘎嘎嘎');
}

var Chicken = function () {};
Chicken.prototype.sound = function () {
  console.log('咯咯咯');
}

makeSound(new Duck()); // 嘎嘎嘎
makeSound(new Chicken()); // 咯咯咯

// 现在我们向鸭和鸡都发出“叫唤”的消息，它们接到消息后分别作出了不同的反应。如果有
// 一天动物世界里又增加了一只狗，这时候只要简单地追加一些代码就可以了，而不用改动以前的 makeSound 函数，如下所示：
var Dog = function () {};
Dog.prototype.sound = function () {
  console.log('汪汪汪');
}

makeSound(new Dog()); // 汪汪汪

// * 1.2.3 类型检查和多态
// pdf 第25页

// * 1.2.4 使用继承得到多态效果  

// * 1.2.5 JavaScript的多态 --- 归根结底先要消除类型之间的耦合关系 

/**
 * 1.2.6 多态在面向对象程序设计中的作用
 *  多态最根本的作用就是通过把过程化的条件分支语句转化为对象的多态性， 从而消除这些条件分支语句。
 */

// eg. 假设我们要编写一个地图应用，现在有两家可选的地图 API提供商供我们接入自己的应用。
//     目前我们选择的是谷歌地图，谷歌地图的 API中提供了 show方法，负责在页面上展示整个地图。 示例代码如下：
`
var googleMap = {
  show: () => {
    console.log('开始渲染谷歌地图');
  }
}

var renderMap = function () {
  googleMap.show();
}
renderMap(); //开始渲染谷歌地图 `

// 后来因为某些原因，要把谷歌地图换成百度地图，为了让 renderMap 函数保持一定的弹性， 我们用一些条件分支来让 renderMap 函数同时支持谷歌地图和百度地图：

var googleMap = {
  show: function () {
    console.log('开始渲染谷歌地图');
  }
};
var baiduMap = {
  show: function () {
    console.log('开始渲染百度地图');
  }
};

`
var renderMap = function (type) {
  if (type === 'google') {
    googleMap.show();
  } else if (type === 'baidu') {
    baiduMap.show();
  }
};

renderMap('google'); //开始渲染谷歌地图
renderMap('baidu'); //开始渲染百度地图  `

// 可以看到，虽然 renderMap 函数目前保持了一定的弹性，但这种弹性是很脆弱的，一旦需要
// 替换成高德地图，那无疑必须得改动 renderMap 函数，继续往里面堆砌条件分支语句

// * 我们还是先把程序中相同的部分抽象出来，那就是显示某个地图：
var renderMap2 = function (map) {
  if (map.show instanceof Function) {
    map.show();
  }
}

renderMap2(googleMap); //开始渲染谷歌地图
renderMap2(baiduMap); //开始渲染百度地图

var tencentMap = {
  show: () => {
    console.log('腾讯地图');
  }
}

renderMap2(tencentMap); // 腾讯地图

// * 在这个例子中，我们假设每个地图 API提供展示地图的方法名都是 show，在实际开发中也许
// * 不会如此顺利，这时候可以借助适配器模式来解决问题。

/**
 * 1.2.7 设计模式与多态
 *  pdf 第30页
 */